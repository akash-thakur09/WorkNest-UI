const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
};

export const env = {
  apiUrl: getEnvVar('VITE_API_URL'),
} as const;

// Validate on module load
if (typeof window !== 'undefined') {
  console.log('Environment validated successfully');
}
