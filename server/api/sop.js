// server/api/sop.js - UPDATED for Vercel Serverless
const express = require('express');
const router = express.Router();
const GPTHandler = require('../services/gpt-handler');

// Generate SOP
router.post('/generate', async (req, res) => {
  try {
    const { 
      resumeText, // Now directly passing the resume text from client
      program, 
      university, 
      degree, 
      experience, 
      achievements 
    } = req.body;

    // Validate required fields
    if (!resumeText || !program || !university || !degree) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Generate SOP directly using the passed text
    const sop = await GPTHandler.generateSOP(resumeText, {
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