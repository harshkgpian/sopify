// server/api/sop.js
const express = require('express');
const router = express.Router();
const GPTHandler = require('../services/gpt-handler');

// Generate SOP
router.post('/generate', async (req, res) => {
  try {
    const { uploadId, program, university, degree, experience, achievements } = req.body;

    // Validate required fields
    if (!uploadId || !program || !university || !degree) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Get the extracted text from the session
    if (!req.app.locals.userUploads || !req.app.locals.userUploads[uploadId]) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found. Please upload again.'
      });
    }

    const { extractedText } = req.app.locals.userUploads[uploadId];

    // Generate SOP
    const sop = await GPTHandler.generateSOP(extractedText, {
      program,
      university,
      degree,
      experience,
      achievements
    });

    res.status(200).json({
      success: true,
      message: 'SOP generated successfully',
      sop
    });
  } catch (error) {
    console.error('Error generating SOP:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating SOP',
      error: error.message
    });
  }
});

module.exports = router;