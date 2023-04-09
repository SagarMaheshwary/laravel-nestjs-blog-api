import * as path from 'path';

export const getEnv = (key: string, defaultVal: any = null) => {
  return process.env[key] ?? defaultVal;
};

export const getRelativePath = (file: string, extension: boolean = false) => {
  const filePath = path
    .relative(__dirname, file)
    .split(path.sep)
    .slice(1)
    .join(path.sep);

  if (extension) {
    return filePath;
  }

  return filePath.split('.').slice(0, -1).join('.');
};

export const response = (data: object, message: string) => {
  return {
    data,
    message,
  };
};
