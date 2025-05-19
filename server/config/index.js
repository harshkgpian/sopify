/**
 * Main configuration file for the application
 */
module.exports = {
  app: {
    name: 'SOP Generator',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['.pdf', '.doc', '.docx', '.txt', '.rtf']
  }
};