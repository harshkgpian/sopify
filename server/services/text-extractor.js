// server/services/text-extractor.js
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class TextExtractor {
  /**
   * Extract text from a file based on its extension
   * @param {string} filePath - Path to the file
   * @returns {Promise<string>} - Extracted text
   */
  static async extractText(filePath) {
    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {
      case '.pdf':
        return await TextExtractor.extractFromPdf(filePath);
      case '.docx':
        return await TextExtractor.extractFromDocx(filePath);
      case '.doc':
        // For .doc files, we'll use a simpler approach
        // Note: This is a simplified handling for .doc files
        return await TextExtractor.extractFromDocx(filePath);
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  }

  /**
   * Extract text from a PDF file
   * @param {string} filePath - Path to the PDF file
   * @returns {Promise<string>} - Extracted text
   */
  static async extractFromPdf(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  /**
   * Extract text from a DOCX file
   * @param {string} filePath - Path to the DOCX file
   * @returns {Promise<string>} - Extracted text
   */
  static async extractFromDocx(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      console.error('Error extracting text from DOCX:', error);
      throw new Error('Failed to extract text from DOCX');
    }
  }
}

module.exports = TextExtractor;