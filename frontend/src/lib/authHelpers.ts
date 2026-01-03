// lib/authHelpers.ts
export const generateSystemCredentials = (
  companyName: string, 
  fullName: string, 
  userCount: number
) => {
  const currentYear = new Date().getFullYear();
  
  // 1. Company Code (First 2 letters of Company) -> "OI"
  const companyCode = companyName.substring(0, 2).toUpperCase();

  // 2. Name Code (First 2 letters of First & Last Name) -> "JODO"
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : firstName;
  
  const nameCode = (
    firstName.substring(0, 2) + 
    (lastName.substring(0, 2) || 'XX')
  ).toUpperCase();

  // 3. Serial Number (Padded to 4 digits) -> "0001"
  const serialNumber = String(userCount + 1).padStart(4, '0');

  // Final ID: OIJODO20250001
  const loginId = `${companyCode}${nameCode}${currentYear}${serialNumber}`;

  // 4. Auto-generated temporary password
  const tempPassword = `Pass@${Math.floor(1000 + Math.random() * 9000)}`;

  return { loginId, tempPassword };
};