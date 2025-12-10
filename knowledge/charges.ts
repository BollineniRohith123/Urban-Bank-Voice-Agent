// Service Charges Knowledge Base - Guntur Co-Operative Urban Bank

export const ACCOUNT_CHARGES_INFO = `
## Account-Related Charges
- Cheque Book Issuance: ₹50 + GST
- Duplicate Passbook: ₹100
- Statement Charges: No charges
- Account Closing (CASA): ₹100 + GST
- Minimum Balance Non-Maintenance: No charges
- Cash Withdrawal (Annual Aggregate up to ₹20 lakhs): Nil
`;

export const CHEQUE_CHARGES_INFO = `
## Check & Payment Services
- Cheque Return Charges: ₹150
- Cheque Bounce Charges (Inward): ₹150
- Demand Draft / Pay Order Commission: ₹2.50 per ₹1,000
`;

export const DIGITAL_TRANSFER_CHARGES_INFO = `
## Digital & Transfer Charges

### NEFT (National Electronic Funds Transfer)
- Up to ₹10,000: ₹2 + GST (₹3.60 total)
- ₹10,001 to ₹1 lakh: ₹4 + GST
- ₹1 lakh to ₹2 lakh: ₹12 + GST
- Above ₹2 lakh: ₹20 + GST

### RTGS (Real-Time Gross Settlement)
- ₹2 lakh to ₹5 lakh: ₹20 + GST
- Above ₹5 lakh: ₹40 + GST

### Other Digital Services
- IMPS (Digital Banking): Included in account features
- ATM Withdrawal (At Bank Branches): No charges
- PhonePe / Google Pay Services: Included; no separate charge
`;

export const LEGAL_NPA_CHARGES_INFO = `
## Legal & NPA (Non-Performing Asset) Charges
- NPA Notice Issuance: ₹100
- NPA Legal Notice Issuance: ₹200
- Gold Loan Closing (Within 15 days): Minimum 15 days interest on sanctioned amount
`;

export const LOCKER_DOCUMENT_CHARGES_INFO = `
## Locker & Document Services
- Locker Break-Open (Key Lost): Company's charge + Service Tax applicable
- Franklin Stamp Charges (Lockers): ₹100
- House Document Xerox: ₹100
- Branch-to-Branch Remittances: Actual transport charges
`;

export const MISCELLANEOUS_CHARGES_INFO = `
## Miscellaneous Services
- CIBIL Report Generation: ₹200
- Appraiser Charges (Loans): ₹2 per ₹1,000 (minimum ₹50, maximum ₹600 for loans over ₹3 lakh)
`;

export const PROCESSING_FEE_INFO = `
## Processing Fee Schedule by Product
- Home Loan: 1% of loan amount + GST
- MSME/Term Loans: 1% of loan amount + GST
- Project Finance: 1% of loan amount + GST
- Vehicle Loans (2W/4W): 1% of loan amount + GST
- Mortgage Loan: 1% of loan amount + GST
- Term Deposit Loans: Nil
- Gold Loans: Negotiable/Waivable
- Educational Loans: As decided by bank + GST

## GST Applicability
GST at 18% is applicable on most service charges except:
- Cheque return/bounce charges (₹150, no GST)
- NPA notice charges (₹100, no GST)
- Duplicate passbook (₹100, no GST)
- Franklin stamp & document xerox charges (₹100)

Important Note: GST is NOT applied to loan interest rates themselves—only to service/processing charges and certain banking services.
`;

export const REPAYMENT_PENALTIES_INFO = `
## Loan Repayment Terms & Penalties

### EMI Structure
- All loans above ₹2 lakhs in the gold loan category attract EMI charges
- EMIs are equated monthly installments calculated on reducing balance method
- For salaried borrowers, check-off facility or NACH mandate is preferred for automatic deduction

### Pre-Closure / Prepayment Charges
- Term Loans: 2% of remaining repayment schedule if closed 2 years before loan issue date or if transferred to another financial organization
- Overdraft Facility: No prepayment/foreclosure charges

### Late Payment / Default Charges
- Gold Loans: Minimum interest on sanctioned amount charged if closed within 15 days
- Home Loans: 2% p.a. penalty on delayed EMI for the delayed period
- Recurring Deposits: ₹1.50 per ₹100 per month on late installments
`;

export const ALL_CHARGES_INFO = `
${ACCOUNT_CHARGES_INFO}
${CHEQUE_CHARGES_INFO}
${DIGITAL_TRANSFER_CHARGES_INFO}
${LEGAL_NPA_CHARGES_INFO}
${LOCKER_DOCUMENT_CHARGES_INFO}
${MISCELLANEOUS_CHARGES_INFO}
${PROCESSING_FEE_INFO}
${REPAYMENT_PENALTIES_INFO}
`;
