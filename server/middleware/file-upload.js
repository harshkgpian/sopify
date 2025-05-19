// server/middleware/file-upload.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
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