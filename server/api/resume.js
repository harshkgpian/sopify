// server/api/resume.js - UPDATED for Vercel
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

    // Store the file path and extracted text in the session
    // Note: In a production app, you'd use a database or proper session management
    if (!req.app.locals.userUploads) {
      req.app.locals.userUploads = {};
    }
    
    const uploadId = Date.now().toString();
    req.app.locals.userUploads[uploadId] = {
      filePath: req.file.path,
      extractedText
    };

    res.status(200).json({
      success: true,
      message: 'Resume uploaded and processed successfully',
      uploadId,
      extractedText: extractedText.substring(0, 200) + '...' // Preview of extracted text
    });
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