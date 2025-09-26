export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidFileType = (
  file: File,
  allowedTypes: ReadonlyArray<string>
): boolean => {
  return allowedTypes.includes(file.type);
};
