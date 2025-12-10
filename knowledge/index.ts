// Knowledge Base Index - Guntur Co-Operative Urban Bank
// This file combines all knowledge modules into a comprehensive knowledge base

import { ALL_LOANS_INFO, GOLD_LOAN_INFO } from './loans';
import { ALL_DEPOSITS_INFO } from './deposits';
import { ALL_CHARGES_INFO } from './charges';
import { ALL_BRANCHES_INFO } from './branches';

// Complete knowledge base for the KnowledgeBot (text chat)
export const COMPLETE_BANK_KNOWLEDGE_BASE = `
# Guntur Co-Operative Urban Bank (GCUB) - Complete Knowledge Base

${ALL_BRANCHES_INFO}

---

# LOAN PRODUCTS
${ALL_LOANS_INFO}

---

# DEPOSIT PRODUCTS
${ALL_DEPOSITS_INFO}

---

# SERVICE CHARGES & FEES
${ALL_CHARGES_INFO}
`;

// Export individual modules for targeted use in roleplay scenarios
export { GOLD_LOAN_INFO } from './loans';
export { ALL_LOANS_INFO } from './loans';
export { ALL_DEPOSITS_INFO } from './deposits';
export { ALL_CHARGES_INFO } from './charges';
export { ALL_BRANCHES_INFO } from './branches';
