/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle specific errors
  if (err.name === 'MulterError') {
    // Handle file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size is too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      error: `File upload error: ${err.message}`
    });
  }
  
  // Handle OpenAI API errors
  if (err.name === 'OpenAIError') {
    return res.status(500).json({
      error: 'Error communicating with AI service. Please try again later.'
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong. Please try again later.' 
      : err.message
  });
};

module.exports = errorHandler;