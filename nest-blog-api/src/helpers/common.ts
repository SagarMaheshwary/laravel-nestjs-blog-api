export const getEnv = (key: string, defaultVal: any = null) => {
  return process.env[key] ?? defaultVal;
};
