
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SCENARIOS } from '../constants';
import { Scenario, Language } from '../types';
import Visualizer from './Visualizer';
import { base64ToUint8Array, decodeAudioData, pcmToGeminiBlob } from '../utils/audioUtils';

const RoleplayTrainer: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.ENGLISH);
  const [isConnected, setIsConnected] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Volume based barge-in
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const isInterruptedRef = useRef(false);
  
  // Playback cursor
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<Promise<any> | null>(null);

  // Cleanup function
  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.then((session) => {
        try {
          session.close();
        } catch (e) {
          console.warn("Session close error", e);
        }
      }).catch(() => {});
      sessionRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Stop all playing audio
    audioQueueRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    audioQueueRef.current = [];

    setIsConnected(false);
    setIsAiSpeaking(false);
    setIsUserSpeaking(false);
    nextStartTimeRef.current = 0;
    isInterruptedRef.current = false;
  }, []);

  // Ensure AudioContext is closed when component unmounts
  useEffect(() => {
    return () => {
      stopSession();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      if (inputAudioContextRef.current) {
        inputAudioContextRef.current.close().catch(() => {});
        inputAudioContextRef.current = null;
      }
    };
  }, [stopSession]);

  const playAudioChunk = async (base64Audio: string) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    try {
      const audioBuffer = await decodeAudioData(
        base64ToUint8Array(base64Audio),
        ctx,
        24000,
        1
      );

      // CRITICAL: Latency Logic
      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime + 0.01;
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
        if (audioQueueRef.current.length === 0) {
            setIsAiSpeaking(false);
        }
      };

      source.start(nextStartTimeRef.current);
      audioQueueRef.current.push(source);
      
      nextStartTimeRef.current += audioBuffer.duration;
      setIsAiSpeaking(true);

    } catch (e) {
      console.error("Audio decoding error", e);
    }
  };

  const handleBargeIn = () => {
    // Client-side interruption: Immediately stop playing audio if user speaks
    if (audioQueueRef.current.length > 0 && !isInterruptedRef.current) {
      isInterruptedRef.current = true;
      audioQueueRef.current.forEach(source => {
        try { 
           source.stop();
        } catch(e) {}
      });
      audioQueueRef.current = [];
      
      if (audioContextRef.current) {
        nextStartTimeRef.current = audioContextRef.current.currentTime;
      }
      setIsAiSpeaking(false);
    }
  };

  const startSession = async () => {
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 1. Initialize Audio Contexts if not present or closed
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (!inputAudioContextRef.current || inputAudioContextRef.current.state === 'closed') {
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }

      const outputCtx = audioContextRef.current;
      const inputCtx = inputAudioContextRef.current;

      await outputCtx.resume();
      await inputCtx.resume();
      
      // 2. Get Microphone
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      mediaStreamRef.current = stream;
      nextStartTimeRef.current = outputCtx.currentTime;

      // 3. Construct System Instructions
      let languageInstruction = `LANGUAGE SETTING: You must communicate in ${selectedLanguage}.`;
      if (selectedLanguage === Language.ENGLISH) {
        languageInstruction += ` Speak with a clear, professional Indian English accent.`;
      } else if (selectedLanguage === Language.TELUGU) {
        languageInstruction += ` Speak strictly in Telugu (or Tanglish as spoken in Guntur). Do not switch to full English unless asked.`;
      }

      const finalSystemInstruction = `${selectedScenario.systemInstruction}\n\n${languageInstruction}`;

      // 4. Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: finalSystemInstruction,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedScenario.voiceName || 'Kore' } },
          },
        },
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setIsConnected(true);
            isInterruptedRef.current = false;

            if (!inputCtx || !stream) return;

            const source = inputCtx.createMediaStreamSource(stream);
            sourceRef.current = source;

            // Use 2048 buffer for balance between latency (~128ms) and stability
            const processor = inputCtx.createScriptProcessor(2048, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Calculate RMS for barge-in and visualizer
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              const rms = Math.sqrt(sum / inputData.length);
              
              // Local Barge-in: If user is speaking loudly enough, cut off the AI
              if (rms > 0.02 && isAiSpeaking) {
                 handleBargeIn();
              }

              const isSpeech = rms > 0.005;
              setIsUserSpeaking(isSpeech);

              const pcmBlob = pcmToGeminiBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(e => {
                console.debug("Send failed (session likely closed):", e);
              });
            };

            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
               isInterruptedRef.current = false;
               await playAudioChunk(base64Audio);
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              console.log("Server signalled interruption");
              handleBargeIn();
            }
          },
          onclose: () => {
            console.log('Gemini Live Session Closed');
            stopSession();
          },
          onerror: (err) => {
            console.error('Gemini Live Error', err);
            setError("Connection error. Please try again.");
            stopSession();
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start session");
      stopSession();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Voice Roleplay Trainer</h2>
        <p className="text-slate-600 mb-6">
          Practice your customer service skills. The AI acts as a customer.<br/>
          <span className="font-semibold text-blue-600">Speak naturally. Interrupt if needed. Say "I am done" to finish.</span>
        </p>

        {/* Configuration Area */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Scenario Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Scenario</label>
            <div className="grid grid-cols-1 gap-3">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => !isConnected && setSelectedScenario(s)}
                  disabled={isConnected}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedScenario.id === s.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-blue-300 bg-white'
                  } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{s.title}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-500">{s.difficulty}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="w-full md:w-64">
             <label className="block text-sm font-medium text-slate-700 mb-2">Select Language</label>
             <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
               <button
                 onClick={() => !isConnected && setSelectedLanguage(Language.ENGLISH)}
                 disabled={isConnected}
                 className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                   selectedLanguage === Language.ENGLISH 
                     ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200' 
                     : 'text-slate-500 hover:text-slate-700'
                 } ${isConnected ? 'opacity-50' : ''}`}
               >
                 English (IN)
               </button>
               <button
                 onClick={() => !isConnected && setSelectedLanguage(Language.TELUGU)}
                 disabled={isConnected}
                 className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                   selectedLanguage === Language.TELUGU 
                     ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200' 
                     : 'text-slate-500 hover:text-slate-700'
                 } ${isConnected ? 'opacity-50' : ''}`}
               >
                 Telugu
               </button>
             </div>
             
             {/* Status Indicator */}
             {isConnected && (
               <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isUserSpeaking ? 'bg-green-500 animate-ping' : 'bg-slate-300'}`}></div>
                  <span className="text-xs text-slate-500 font-medium">
                    {isUserSpeaking ? "Transmitting..." : "Listening"}
                  </span>
               </div>
             )}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center justify-center min-h-[450px] bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          <Visualizer isActive={isConnected} isSpeaking={isAiSpeaking} />

          <div className="mt-8 z-10 flex gap-4">
            {!isConnected ? (
              <button
                onClick={startSession}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Start Simulation
              </button>
            ) : (
              <button
                onClick={stopSession}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold shadow-lg shadow-red-500/30 transition-all transform hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                End Call
              </button>
            )}
          </div>
          
          {error && (
            <div className="mt-4 px-4 py-2 bg-red-500/90 text-white text-sm rounded-lg max-w-md text-center z-10">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleplayTrainer;
