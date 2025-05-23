# SOP Generator

A web application that generates personalized Statements of Purpose (SOPs) from resumes and user information using OpenAI's GPT and text humanization.

## Features

- Upload and extract text from various resume formats (PDF, DOC, DOCX, TXT, RTF)
- Collect additional information for personalized SOP generation
- Generate SOPs using OpenAI GPT
- Humanize generated text to make it more authentic
- Download SOPs as Word documents

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/sop-generator.git
   cd sop-generator
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. Create an uploads directory:
   ```
   mkdir uploads
   ```

## Usage

1. Start the server:

   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Follow the steps in the application:
   - Upload your resume
   - Fill in additional information
   - Generate and customize your SOP

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **APIs:** OpenAI GPT
- **File Processing:** pdf-parse, mammoth

## Directory Structure

```
sop-generator/
│
├── public/                       # Public assets
│   ├── css/                      # CSS files
│   │   └── styles.css            # Main stylesheet
│   ├── js/                       # Client-side JavaScript
│   │   ├── main.js               # Main JS file for UI interactions
│   │   ├── upload-handler.js     # Handles resume upload functionality
│   │   └── humanizer.js          # Humanizer integration
│   ├── assets/                   # Images and other static assets
│   └── index.html                # Main HTML file
│
├── server/                       # Server-side code
│   ├── api/                      # API routes
│   │   ├── index.js              # API router
│   │   ├── resume.js             # Resume upload endpoint
│   │   └── sop.js                # SOP generation endpoint
│   │
│   ├── services/                 # Business logic
│   │   ├── text-extractor.js     # Service to extract text from resumes
│   │   ├── gpt-handler.js        # Service to interact with OpenAI API
│   │   └── humanizer-service.js  # Interface with humanizer functionality
│   │
│   ├── middleware/               # Express middleware
│   │   ├── error-handler.js      # Global error handling
│   │   └── file-upload.js        # Middleware for handling file uploads
│   │
│   ├── config/                   # Configuration files
│   │   ├── index.js              # Main config file
│   │   └── openai.js             # OpenAI API configuration
│   │
│   ├── utils/                    # Utility functions
│   │   └── file-utils.js         # File handling utilities
│   │
│   └── server.js                 # Express server entry point
│
├── uploads/                      # Directory for uploaded files
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation
```

## Humanizer Integration

To integrate with your existing humanizer functionality:

1. Update the `humanizer-service.js` file with your specific implementation.
2. If your humanizer is client-side (browser extension), you may need to:
   - Implement a fallback mechanism for server-side generation
   - Use headless browser automation for server-side humanization

## License

This project is licensed under the MIT License - see the LICENSE file for details.
#   s o p i f y  
 