// Loan Products Knowledge Base - Guntur Co-Operative Urban Bank

export const GOLD_LOAN_INFO = `
## Gold Loan Against Gold Ornaments
- Interest Rate: 9.00% p.a.
- Lending rate per gram (24-carat): ₹3,000
- EMI is charged for loans above ₹2 lakhs
- Processing Fee: Typically waived or negotiable
- Closing Charges: If closed within 15 days of account opening, minimum of 15 days interest on sanctioned amount will be charged
- Eligibility: Any individual with valid ID and address proof
- Documents Required: KYC (Aadhaar/PAN), Photos, Pledge Form
`;

export const SECURED_OVERDRAFT_INFO = `
## Secured Overdraft
- Interest Rate: 12.00% p.a. (irrespective of amount)
- Available on deposits and property as collateral
- Interest calculated on the used amount only (daily basis, billed at month-end)
- Renewal charges: Nil
`;

export const VEHICLE_LOAN_INFO = `
## Vehicle Loans

### Two-Wheeler Loan
- Interest Rate: 15.00% p.a. (irrespective of amount)

### Four-Wheeler / Car Loan
- Interest Rate: 13.00% p.a. (irrespective of amount)

### Common Features:
- Processing Fee: 1% of loan amount
- Margin: 10-15% down payment required
- Tenure: Typically 5 years (60 months) maximum for two-wheelers; four-wheelers may go up to 72-84 months
- Security: Hypothecation of the vehicle purchased
- Collateral Security (Optional): NSC, KVP, LIC Policies, Bank Deposits, Land & Building, etc.
`;

export const HOME_LOAN_INFO = `
## Home Loan - Urban Swagruha Housing Loan
- Interest Rate: 13.00% p.a. (irrespective of amount)
- Minimum Amount: ₹1 lakh
- Maximum Amount: ₹10 lakhs
- Tenure: 5 to 15 years (excluding holiday/moratorium period)
- Maximum Moratorium Period: 12 months
- Minimum Margin: 2% p.a. for delayed repayment (penalty for late EMI payments)
- Processing Fee: 1% of the loan amount
- Valuation Charges: 2.5% per ₹1 lakh (subject to maximum of ₹10,000)
- Security: Registered or simple mortgage of the house/flat being acquired from loan proceeds

### Eligibility:
- Indian National, preferably residing in the bank's operational area
- Minimum age: 20 years
- No upper age limit, but repayment must be completed before age 65 or retirement
- Salaried employees, self-employed professionals, and self-employed businessmen eligible
- Income documentation: 3 years IT returns or income proof/declaration
`;

export const MSME_LOAN_INFO = `
## MSME / Term Loans (TLSME) & Project Finance

### MSME Interest Rates (Tiered by Loan Amount):
- Up to ₹15 lakh: 14.00% p.a.
- ₹15 lakh to ₹30 lakh: 13.50% p.a.
- ₹30 lakh to ₹50 lakh: 13.00% p.a.
- ₹50 lakh to ₹75 lakh: 12.50% p.a.
- ₹75 lakh to ₹100 lakh: 12.25% p.a.
- Above ₹100 lakh: 12.00% p.a.

### Project Finance Interest Rates:
- Up to ₹50 lakh: 13.00% p.a.
- ₹50 lakh to ₹75 lakh: 12.50% p.a.
- ₹75 lakh to ₹100 lakh: 12.25% p.a.
- ₹100 lakh to ₹200 lakh: 12.00% p.a.

### Features:
- Processing Fee: 1% of the loan amount
- Tenure: 60 to 120 months depending on income and loan amount
- Finance Limit: Up to 50% of property value as estimated by bank
- Appraiser Charges: ₹2 per ₹1,000 (minimum ₹50, maximum ₹600 for loans above ₹3 lakhs)
`;

export const MORTGAGE_LOAN_INFO = `
## Mortgage Loan
- Interest Rate: Follows MSME tiering or negotiated rates
- Maximum Loan Amount: Up to 50% of market value of property as estimated by bank
- Tenure: 60 to 120 months depending on applicant's income and loan size
- Valuation Charges: 2.5% per ₹1 lakh (maximum ₹10,000)
- Processing Fee: 1% of loan amount
- Stamp Duty & Legal Charges: As prescribed under the stamp act and Andhra Pradesh Government regulations
- Security: Property title must be clear with no encumbrances; original title deeds required

### Required Documents:
- Original title deeds and link documents (30-year chain of ownership)
- Latest rent receipts
- KYC documents, PAN card (if available), photographs
- Municipal plan (if applicable)
- 3 years IT returns (for individual assessees) or business balance sheets (for businesses)
- Income proof or salary certificate
- Project report (if new project)
`;

export const TERM_DEPOSIT_LOAN_INFO = `
## Overdraft Against Deposits (Term Deposit Loans)
- Interest Rate: Usually tied to base rate + spread; not fixed
- Processing Fee: Nil
- Other Charges: Nil
- Loan Amount: Up to 80% of available balance in Recurring Deposit account
- Tenure: Flexible, tied to deposit maturity or repayment schedule
- Repayment: Usually interest-only during tenure with principal repayment at maturity
`;

export const SHORT_TERM_LOAN_INFO = `
## Urban Short-Term Loan
- Interest Rate: 24.00% p.a. (irrespective of amount)
- This is a high-interest short-term product for emergency needs
`;

export const EDUCATION_LOAN_INFO = `
## Educational Loans
- Interest Rate: Contact bank branch for current rates
- Processing Fee: As decided by the bank from time to time
- Maximum Loan Limit: Up to ₹10 lakhs (typical for educational loans)
- Full details available in Downloads section; applicants must visit branch or request documentation
`;

export const ALL_LOANS_INFO = `
${GOLD_LOAN_INFO}
${SECURED_OVERDRAFT_INFO}
${VEHICLE_LOAN_INFO}
${HOME_LOAN_INFO}
${MSME_LOAN_INFO}
${MORTGAGE_LOAN_INFO}
${TERM_DEPOSIT_LOAN_INFO}
${SHORT_TERM_LOAN_INFO}
${EDUCATION_LOAN_INFO}
`;
