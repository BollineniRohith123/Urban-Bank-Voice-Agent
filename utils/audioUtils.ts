import { Blob } from '@google/genai';

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function pcmToGeminiBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    // Clamp values to [-1, 1] before scaling
    const s = Math.max(-1, Math.min(1, data[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return {
    data: arrayBufferToBase64(int16.buffer),
    mimeType: 'audio/pcm;rate=16000',
  };
}

/**
 * Simple Energy-based Voice Activity Detector (VAD)
 */
export class VoiceActivityDetector {
  // RMS Threshold: Adjust based on testing. 0.01 is a reasonable starting point for speech vs background noise.
  threshold = 0.01; 
  // Hangover time (ms): How long to keep "speaking" state true after audio drops below threshold.
  // This prevents cutting off the ends of words.
  hangover = 500; 
  lastSpeechTime = 0;

  process(data: Float32Array): boolean {
    // Calculate RMS (Root Mean Square)
    let sum = 0;
    const len = data.length;
    for (let i = 0; i < len; i++) {
      sum += data[i] * data[i];
    }
    const rms = Math.sqrt(sum / len);

    const now = Date.now();
    
    // Check if current frame is above threshold
    if (rms > this.threshold) {
      this.lastSpeechTime = now;
      return true;
    }

    // Check hangover period
    if (now - this.lastSpeechTime < this.hangover) {
      return true;
    }

    return false;
  }
}