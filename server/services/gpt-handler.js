// server/services/gpt-handler.js
const openai = require('../config/openai');

class GPTHandler {
  /**
   * Generate an SOP using OpenAI
   * @param {string} resumeText - Extracted text from the resume
   * @param {Object} userInfo - Additional information provided by the user
   * @returns {Promise<string>} - Generated SOP
   */
  static async generateSOP(resumeText, userInfo) {
    try {
      const { program, university, degree, experience, achievements } = userInfo;

      // Create the prompt for OpenAI
      const prompt = `
        Create a statement of purpose (SOP) for a ${degree} application to ${program} at ${university}. 
        
        Here is information about the applicant:
        
        RESUME:
        ${resumeText}
        
        ADDITIONAL INFORMATION:
        - Work Experience Highlights: ${experience || 'Not provided'}
        - Key Achievements: ${achievements || 'Not provided'}
        
        Write a compelling, well-structured SOP that:
        1. Introduces the applicant and their background
        2. Explains why they're interested in this specific program
        3. Describes how their experience and skills align with the program
        4. Outlines their future goals and how this program will help achieve them
        5. Concludes with a strong statement about their suitability for the program
        
        Keep it around 300 words, written in first person perspective. Make it personal, specific, and honest based on the information provided.
      `;

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: "You are an expert in writing compelling and personalized statements of purpose for university applications." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating SOP:', error);
      throw new Error('Failed to generate SOP');
    }
  }
}

module.exports = GPTHandler;