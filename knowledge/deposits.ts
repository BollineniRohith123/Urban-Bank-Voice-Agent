// Deposit Products Knowledge Base - Guntur Co-Operative Urban Bank

export const FIXED_DEPOSIT_INFO = `
## Fixed Deposits (Term Deposits)

### General Interest Rate Structure (Typical ranges, verify with branch for current rates):
- 30-180 days: ~5.25-5.50% p.a.
- 6-12 months: ~6.00-6.75% p.a.
- Above 24 months: ~6.25-6.50% p.a.
- Senior Citizen (1-year example): Up to 8.50% p.a.

Note: Rates are subject to change; always check the latest "Deposit Rate of Interests" PDF on the Downloads page for current applicable rates.
`;

export const RECURRING_DEPOSIT_INFO = `
## Recurring Deposits (RD)
- Tenure: 12 to 120 months (flexible)
- Interest Calculation: Compounded quarterly and added to principal
- Penalty for Late Payment: ₹1.50 per ₹100 per month on arrear installments
- Premature Closure: Allowed with 1% penal deduction
- Loan Facility: Borrowers can avail loans/overdrafts up to 80% of available RD balance
- Tax Implications: TDS (Tax Deducted at Source) is applicable

### Special Features:
- Nomination facility available
- Maturity amount credited to Savings Bank account on maturity date
`;

export const SAVINGS_DEPOSIT_INFO = `
## Savings Deposits
- Minimum Balance Maintenance: No charges for non-maintenance
- DICGC insurance protection
- Digital banking (IMPS, ATM, UPI via PhonePe/Google Pay)
- Nomination facility
- Any-Branch Banking (ABB) available
`;

export const CURRENT_DEPOSIT_INFO = `
## Current Deposits (CD Accounts)
- Minimum Balance Requirement: ₹1,000
- Charges for Below Minimum Balance: No charges levied (as per latest circular)
- Interest Rate: Nil (no interest on current deposits, standard banking practice)

### Features:
- Unlimited cheque facility
- QR code collections available
- Multi-user access available
`;

export const ALL_DEPOSITS_INFO = `
${FIXED_DEPOSIT_INFO}
${RECURRING_DEPOSIT_INFO}
${SAVINGS_DEPOSIT_INFO}
${CURRENT_DEPOSIT_INFO}
`;
