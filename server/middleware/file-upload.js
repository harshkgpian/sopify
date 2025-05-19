// server/middleware/file-upload.js - UPDATED for Vercel
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists in /tmp (for Vercel serverless environment)
const uploadsDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating uploads directory:', error);
  }
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /pdf|doc|docx/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = file.mimetype.includes('pdf') || 
                   file.mimetype.includes('msword') ||
                   file.mimetype.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only PDF or Word files are allowed!');
  }
}

module.exports = upload;