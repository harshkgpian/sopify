// public/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // Step navigation elements
  const steps = document.querySelectorAll('.step');
  const formSteps = document.querySelectorAll('.form-step');

  // Navigation buttons
  const nextToStep2Btn = document.getElementById('next-to-step2');
  const backToStep1Btn = document.getElementById('back-to-step1');
  const nextToStep3Btn = document.getElementById('next-to-step3');
  const backToStep2Btn = document.getElementById('back-to-step2');
  const backToStep3Btn = document.getElementById('back-to-step3');
  const restartBtn = document.getElementById('restart');

  // Form elements
  const infoForm = document.getElementById('info-form');
  const programInput = document.getElementById('program');
  const universityInput = document.getElementById('university');
  const degreeInput = document.getElementById('degree');
  const experienceInput = document.getElementById('experience');
  const achievementsInput = document.getElementById('achievements');

  // SOP generation elements
  const generateSopBtn = document.getElementById('generate-sop');
  const loadingContainer = document.getElementById('loading-container');
  const generatedSopTextarea = document.getElementById('generated-sop');
  const copySopBtn = document.getElementById('copy-sop');
  const copyHumanizedBtn = document.getElementById('copy-humanized');

  // Preview elements
  const programPreview = document.getElementById('program-preview');
  const universityPreview = document.getElementById('university-preview');
  const degreePreview = document.getElementById('degree-preview');
  const experiencePreview = document.getElementById('experience-preview');
  const achievementsPreview = document.getElementById('achievements-preview');

  // Step navigation
  function goToStep(stepNumber) {
    // Update stepper
    steps.forEach(step => {
      if (parseInt(step.dataset.step) <= stepNumber) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
    
    // Show relevant form step
    formSteps.forEach(formStep => {
      formStep.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
  }

  // Navigation button event listeners
  nextToStep2Btn.addEventListener('click', function() {
    goToStep(2);
  });

  backToStep1Btn.addEventListener('click', function() {
    goToStep(1);
  });

  nextToStep3Btn.addEventListener('click', function() {
    // Validate required fields
    if (infoForm.checkValidity()) {
      // Update preview
      updatePreview();
      goToStep(3);
    } else {
      infoForm.reportValidity();
    }
  });

  backToStep2Btn.addEventListener('click', function() {
    goToStep(2);
  });

  backToStep3Btn.addEventListener('click', function() {
    goToStep(3);
  });

  restartBtn.addEventListener('click', function() {
    location.reload();
  });

  // Update preview data
  function updatePreview() {
    programPreview.textContent = programInput.value;
    universityPreview.textContent = universityInput.value;
    degreePreview.textContent = degreeInput.value;
    experiencePreview.textContent = experienceInput.value || 'Not provided';
    achievementsPreview.textContent = achievementsInput.value || 'Not provided';
  }

  // Generate SOP
  generateSopBtn.addEventListener('click', function() {
    // Show loading indicator
    loadingContainer.style.display = 'block';
    generateSopBtn.disabled = true;
    
    // Get uploaded resume ID
    const uploadId = window.sopGenerator.getUploadedResumeId();
    
    if (!uploadId) {
      alert('Please upload a resume first');
      loadingContainer.style.display = 'none';
      generateSopBtn.disabled = false;
      return;
    }
    
    // Prepare data for SOP generation
    const data = {
      uploadId,
      program: programInput.value,
      university: universityInput.value,
      degree: degreeInput.value,
      experience: experienceInput.value,
      achievements: achievementsInput.value
    };
    
    // Send request to generate SOP
    fetch('/api/sop/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Display generated SOP
        generatedSopTextarea.value = data.sop;
        // Auto-fill the humanizer input
        document.getElementById('inputText').value = data.sop;
        // Go to step 4
        goToStep(4);
      } else {
        alert('Error generating SOP: ' + (data.message || 'Please try again.'));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error generating SOP. Please try again.');
    })
    .finally(() => {
      // Hide loading indicator
      loadingContainer.style.display = 'none';
      generateSopBtn.disabled = false;
    });
  });

  // Copy buttons
  copySopBtn.addEventListener('click', function() {
    generatedSopTextarea.select();
    document.execCommand('copy');
    alert('SOP copied to clipboard!');
  });

  copyHumanizedBtn.addEventListener('click', function() {
    const result = document.getElementById('result');
    const textarea = document.createElement('textarea');
    textarea.value = result.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Humanized text copied to clipboard!');
  });
});