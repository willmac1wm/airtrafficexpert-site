import { GoogleGenerativeAI } from "@google/generative-ai";

// Note: For production, use environment variables properly
// For now, the AI features will show a graceful error if no API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const generateBlogContent = async (topic: string, tone: string): Promise<string> => {
  if (!genAI) {
    return "⚠️ AI features require a Gemini API key. Set VITE_GEMINI_API_KEY in your environment.";
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      You are an expert Air Traffic Control Consultant. 
      Write a professional, SEO-optimized blog post structure and introduction about: "${topic}".
      The tone should be: ${tone}.
      Include:
      1. Catchy Title
      2. Meta Description
      3. Key Points Outline
      4. An engaging introductory paragraph (approx 150 words).
      
      Format the output in Markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API key and try again.";
  }
};

export const analyzeRfp = async (rfpText: string): Promise<string> => {
  if (!genAI) {
    return "⚠️ AI features require a Gemini API key. Set VITE_GEMINI_API_KEY in your environment.";
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      You are a Government Contract Specialist for Aviation.
      Analyze the following RFP summary/text and provide a strategic assessment.
      
      RFP Text: "${rfpText}"
      
      Please provide:
      1. A Match Score (0-100) for an Air Traffic Control consultant.
      2. Key Requirements list.
      3. Potential Risks.
      4. A "Win Strategy" suggestion.
      
      Format the output in Markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Failed to analyze RFP.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error analyzing RFP. Please check your API key and try again.";
  }
};
