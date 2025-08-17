export const generateRandomToken = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// used for quotes, shipments etc
export const generateRandomId = () => {
  const randomString = String(Math.floor(Math.random() * 10000)).padStart(
    4,
    '0',
  );
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 2; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomString + result;
};
