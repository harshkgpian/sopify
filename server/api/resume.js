// server/api/resume.js - UPDATED for Vercel Serverless
const express = require('express');
const router = express.Router();
const upload = require('../middleware/file-upload');
const TextExtractor = require('../services/text-extractor');
const fs = require('fs');
const path = require('path');

// Use /tmp directory in Vercel instead of a project-relative directory
const uploadsDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating uploads directory:', error);
    // Continue even if directory creation fails - we'll handle errors at upload time
  }
}

// Upload and process resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Extract text from the uploaded file
    const extractedText = await TextExtractor.extractText(req.file.path);

    // Return the full extracted text to the client
    // (we'll store it in the browser, not in server memory)
    res.status(200).json({
      success: true,
      message: 'Resume uploaded and processed successfully',
      extractedText: extractedText, // Return full extracted text
      previewText: extractedText.substring(0, 200) + '...' // Preview for display
    });

    // Cleanup: delete the file after processing
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.error('Error deleting temporary file:', err);
      // Non-critical error, we can continue
    }
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing resume',
      error: error.message
    });
  }
});

module.exports = router;