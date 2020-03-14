import path from 'path';

export const isProd = process.env.NODE_ENV === 'production';

export const outputFolder = path.resolve(__dirname, '../../static/captures');

export const previewImageDimensions = { width: 600, height: 300 };

export const maxImageDimensions = { width: 1600, height: 800 };

export const batchSize = 40;
