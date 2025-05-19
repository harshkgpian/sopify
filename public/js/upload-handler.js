// public/js/upload-handler.js
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('resume-upload');
  const browseBtn = document.getElementById('browse-btn');
  const uploadStatus = document.getElementById('upload-status');
  const nextBtn = document.getElementById('next-to-step2');
  
  // Global variables
  let uploadedResumeId = null;
  let resumeText = '';

  // Prevent default behavior for drag events
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight drop area when file is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    dropArea.classList.add('dragover');
  }

  function unhighlight() {
    dropArea.classList.remove('dragover');
  }

  // Handle dropped files
  dropArea.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length) {
      fileInput.files = files;
      handleFiles(files);
    }
  }

  // Handle file input change
  fileInput.addEventListener('change', function() {
    if (this.files.length) {
      handleFiles(this.files);
    }
  });

  // Browse button click
  browseBtn.addEventListener('click', function() {
    fileInput.click();
  });

  // Click anywhere in drop area to trigger file input
  dropArea.addEventListener('click', function(e) {
    if (e.target !== browseBtn) {
      fileInput.click();
    }
  });

  // Process the selected file
  function handleFiles(files) {
    const file = files[0]; // We only accept one file
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      showUploadStatus('error', 'Only PDF, DOC, or DOCX files are allowed.');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showUploadStatus('error', 'File size should be less than 10MB.');
      return;
    }
    
    // Upload the file
    uploadFile(file);
  }

  // Upload file to server
  function uploadFile(file) {
    showUploadStatus('', 'Uploading and processing resume...');
    
    const formData = new FormData();
    formData.append('resume', file);
    
    fetch('/api/resume/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        uploadedResumeId = data.uploadId;
        resumeText = data.extractedText;
        document.getElementById('resume-preview').textContent = data.extractedText;
        showUploadStatus('success', 'Resume uploaded and processed successfully!');
        nextBtn.disabled = false;
      } else {
        showUploadStatus('error', data.message || 'Error uploading resume.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showUploadStatus('error', 'Error uploading resume. Please try again.');
    });
  }

  // Display upload status
  function showUploadStatus(type, message) {
    uploadStatus.textContent = message;
    uploadStatus.className = 'upload-status';
    
    if (type) {
      uploadStatus.classList.add(type);
    }
  }

  // Make variables available globally
  window.sopGenerator = {
    getUploadedResumeId: () => uploadedResumeId,
    getResumeText: () => resumeText
  };
});