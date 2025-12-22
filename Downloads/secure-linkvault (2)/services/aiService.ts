
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppData } from "../types";
import { FINANCIAL_EVENTS, KEY_DATES, DEPLOYMENT_DOCS, getGeminiKey, COMPANY_ASSETS } from "../constants";
import { formatATCRagForAI } from "../data/atcRagSystem";

// Initialize the API client
let ai: GoogleGenerativeAI | null = null;

export const initializeAI = (): boolean => {
  // Get API key from environment or localStorage - no hardcoded fallback
  const apiKey = getGeminiKey();
  
  if (!apiKey || apiKey.trim() === '') {
    console.warn("AI: No API key found");
    return false;
  }
  
  // Check if key looks valid (starts with AIza)
  if (!apiKey.startsWith('AIza')) {
    console.warn("AI: API key format appears invalid (should start with 'AIza')");
    return false;
  }
  
  try {
    ai = new GoogleGenerativeAI(apiKey);
    console.log("AI: Initialized successfully with key:", apiKey.substring(0, 10) + "...");
      return true;
    } catch (e) {
      console.error("Failed to initialize AI", e);
      return false;
    }
};

// Attempt initialization on load
initializeAI();

export const saveApiKey = (key: string) => {
  localStorage.setItem('dtis_genai_key', key);
  initializeAI();
};

// List available models using the REST API
export const listAvailableModels = async (): Promise<string[]> => {
  const apiKey = getGeminiKey();
  if (!apiKey) {
    console.error("No API key available");
    return [];
  }

  // Try both v1 and v1beta API versions
  const apiVersions = ['v1', 'v1beta'];
  
  for (const version of apiVersions) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`);
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.models && Array.isArray(data.models)) {
        const modelNames = data.models
          .filter((m: any) => {
            const methods = m.supportedGenerationMethods || [];
            return methods.includes('generateContent') || methods.includes('GENERATE_CONTENT');
          })
          .map((m: any) => {
            // Extract model name, removing 'models/' prefix if present
            const name = m.name || m.displayName || '';
            return name.replace(/^models\//, '');
          })
          .filter((name: string) => name.length > 0);
        
        if (modelNames.length > 0) {
          console.log(`Available models (${version}):`, modelNames);
          return modelNames;
        }
      }
    } catch (error) {
      console.warn(`Error listing models from ${version}:`, error);
      continue;
    }
  }
  
  return [];
};

// Helper to check if API key can access models by trying a simple test
export const testApiKey = async (): Promise<{ success: boolean; model?: string; error?: string }> => {
  if (!ai && !initializeAI()) {
    return { success: false, error: "AI not initialized" };
  }
  
  const modelsToTry = ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash"];
  
  for (const modelName of modelsToTry) {
    try {
      const model = ai!.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("test");
      await result.response;
      return { success: true, model: modelName };
    } catch (error: any) {
      if (error?.message?.includes('404') || error?.message?.includes('not found')) {
        continue; // Try next model
      }
      return { success: false, error: error?.message || "Unknown error" };
    }
  }
  
  return { success: false, error: "No accessible models found. Please check your API key permissions." };
};

// Helper function to get a working model by trying multiple model names
const getWorkingModel = () => {
  if (!ai) return null;
  
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
  
  for (const modelName of modelsToTry) {
    try {
      const model = ai.getGenerativeModel({ model: modelName });
      // Test if model is accessible by checking if it exists
      return model;
    } catch (error) {
      // Try next model
      continue;
    }
  }
  
  // If all fail, try the first one anyway (will throw error that gets caught by caller)
  return ai.getGenerativeModel({ model: modelsToTry[0] });
};

export const generateNotePolish = async (text: string): Promise<string> => {
  // Re-initialize if needed (in case env vars loaded after module init)
  if (!ai && !initializeAI()) {
    return "AI Service Unavailable (Missing API Key). Please enter your key in the Chatbot.";
  }

  // First, try to get available models
  let modelsToTry = [
    "gemini-pro",           // Most commonly available
    "gemini-1.5-pro",       // Newer model
    "gemini-1.5-flash",     // Faster model
  ];
  
  // Try to fetch available models and use those first
  try {
    const availableModels = await listAvailableModels();
    if (availableModels.length > 0) {
      // Use available models first, then fall back to defaults
      modelsToTry = [...availableModels, ...modelsToTry.filter(m => !availableModels.includes(m))];
      console.log("Using available models:", modelsToTry);
    }
  } catch (error) {
    console.warn("Could not fetch available models, using defaults:", error);
  }
  
  let lastError: any = null;
  
  for (const modelName of modelsToTry) {
    try {
      const model = ai!.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(`You are a professional executive assistant. 
      Rewrite the following rough notes into a clean, legible, and professional bulleted list. 
      Correct any spelling or grammar errors. 
      Format it so it can be easily copied into a work email or daily report.
      
      IMPORTANT RULES:
      - Preserve the original meaning and content
      - Only fix spelling and grammar, don't rewrite the content
      - Keep the same structure and style
      - Output ONLY the bulleted list
      - Do not add any introductory text like "Here are the polished notes" or "Sure"
      - Do not add any concluding remarks
      - Just the bullet points
      
      Rough Notes:
      "${text}"`);
      const response = await result.response;
      const polishedText = response.text();
      
      if (!polishedText || polishedText.trim() === '') {
        console.error("AI returned empty response");
        continue; // Try next model
      }
      
      console.log(`Successfully used model: ${modelName}`);
      return polishedText;
    } catch (error: any) {
      console.warn(`Model ${modelName} failed:`, error?.message);
      lastError = error;
      // Continue to next model
      continue;
    }
  }
  
  // If all models failed, return helpful error message
  console.error("All models failed. Last error:", lastError);
  
  if (lastError?.message?.includes('API_KEY') || lastError?.message?.includes('API key') || lastError?.message?.includes('401')) {
    return "AI Service Unavailable (Invalid API Key). Please check your API key in the Chatbot.";
  }
  
  if (lastError?.message?.includes('QUOTA') || lastError?.message?.includes('quota') || lastError?.message?.includes('429')) {
    return "AI Service Unavailable (Quota Exceeded). Please check your API quota.";
  }
  
  if (lastError?.message?.includes('404') || lastError?.message?.includes('not found')) {
    return `AI Service Unavailable: No accessible Gemini models found. Please verify your API key has access to Gemini models at https://aistudio.google.com/apikey. Error: ${lastError?.message || 'Model not found'}`;
  }
  
  // Return error message so handlers can detect it
  return `Error: ${lastError?.message || 'Failed to polish notes. Please try again.'}`;
};

export const reformatToPastTense = async (text: string, date: string): Promise<string> => {
  if (!ai && !initializeAI()) {
    return text; // Return original if AI unavailable
  }

  if (!text.trim()) {
    return text;
  }

  try {
    const model = ai!.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are a professional writing assistant. Convert the following text from present tense to past tense, adding the specific date context.

IMPORTANT RULES:
1. Change "Today I did..." or "I am working on..." to "On ${date}, I completed..." or "On ${date}, I worked on..."
2. Convert all present tense verbs to past tense (e.g., "am working" → "worked", "will do" → "did")
3. Preserve ALL content, details, and structure
4. Keep bullet points and formatting exactly as they are
5. Only change the tense and add the date context at the beginning
6. Do NOT add any introductory text or explanations
7. Output ONLY the reformatted text

Original text:
"${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || text;
  } catch (error) {
    console.error("AI Reformatting Error:", error);
    return text; // Return original on error
  }
};

export const checkSpellingAndGrammar = async (text: string): Promise<{ corrected: string; suggestions: string }> => {
  if (!ai && !initializeAI()) {
    return {
      corrected: text,
      suggestions: "AI Service Unavailable (Missing API Key). Please enter your key in the Chatbot."
    };
  }

  try {
    const model = ai!.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are a helpful writing assistant. Review the following text for spelling and grammar errors.

IMPORTANT RULES:
1. Preserve the original writing style, tone, and formatting
2. Only correct actual spelling and grammar mistakes
3. Do NOT change the meaning or rewrite the content
4. Keep the same structure (line breaks, capitalization style, etc.)
5. If the text is intentionally informal or uses slang, preserve that

Text to check:
"${text}"

Please provide:
1. A corrected version (with only spelling/grammar fixes, no style changes)
2. A brief explanation of what was changed (or "No errors found" if perfect)

Format your response as:
CORRECTED:
[corrected text here]

CHANGES:
[explanation of changes here]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Parse the response
    const correctedMatch = responseText.match(/CORRECTED:\s*([\s\S]*?)(?=CHANGES:|$)/i);
    const changesMatch = responseText.match(/CHANGES:\s*([\s\S]*?)$/i);
    
    const corrected = correctedMatch ? correctedMatch[1].trim() : text;
    const suggestions = changesMatch ? changesMatch[1].trim() : "Review completed.";
    
    return { corrected, suggestions };
  } catch (error) {
    console.error("Spell check error:", error);
    return {
      corrected: text,
      suggestions: "Error checking spelling. Please try again."
    };
  }
};

export const chatWithAssistant = async (query: string, appData: AppData): Promise<string> => {
  if (!ai && !initializeAI()) return "I can help with basic info, but for advanced questions, please paste your API Key in the chat.";

  try {
    // Construct Context from App Data - INCLUDING ALL DATA AS REQUESTED
    const context = `
      You are the DTIS Secure Assistant.
      
      Current Date: ${new Date().toLocaleDateString()}
      
      User Profile:
      - Name: William Macomber
      - Title: ATC Ops Specialist
      - Email: WMacomber@dtis-corp.com
      - Cell: 609-602-4314
      - Hourly Rate: $55.29
      - Start Date: Dec 1, 2025 (Delayed from Nov 3)
      - Company: DTIS, llc ("Della Terra Insù" - From the ground up)
      - Key Location: William J. Hughes Technical Center
      
      Email Templates & Procedures:
      1. Daily Email (To: Sarah Staab; Joe Longo; Chris)
         Subject: William - Daily Email - [Date]
         Body Format:
         Good morning,
         I will be working on the following today, [Date]:
         • Tasks for the day
         • Any special tasks
         • Meetings
         Add in any additional information.

      2. Biweekly Report (To: biweekly@dtis-corp.com)
         Subject: William_TFDM_Bi-Weekly_YYYYMMDD
         Required Sections: Major Accomplishments, Work Performed, Significant Items, Work Planned.
         Note: Submit every other Friday (Pay Day).

      --- CURRENT WORKSPACE ---
      Current Working Note (Today - Active):
      ${appData.currentNote || 'None'}

      Current Tomorrow Plan (Active):
      ${appData.currentTomorrowNote || 'None'}

      Quick Notes / Scratchpad (Persistent):
      ${appData.quickNotes || 'Empty'}

      --- HISTORY & LOGS ---
      Daily Notes History (Archived by Date):
      ${(appData.dailyNotes || []).map(n => `
        [Date: ${n.date}]
        - Work: ${n.content}
        - Plan: ${n.tomorrowContent || 'None'}
      `).join('\n')}

      Performance Logs (Achievements/Goals):
      ${(appData.performanceLogs || []).map(p => `- [${p.date}] ${p.category}: ${p.content}`).join('\n')}

      --- DATA STORE ---
      Company Directory (Name | Email | Cell):
      ${(appData.directory || []).map(c => `- ${c.name} | ${c.email} | ${c.cell}`).join('\n')}
      
      Secrets & Vault Items (SENSITIVE - Use discreetly, passwords redacted):
      ${(appData.secrets || []).map(s => {
        // Redact sensitive fields like passwords before sending to AI
        const redactedDetails = s.details ? Object.fromEntries(
          Object.entries(s.details).map(([key, value]) => {
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes('password') || lowerKey.includes('pass') || lowerKey.includes('pwd')) {
              return [key, '[REDACTED]'];
            }
            return [key, value];
          })
        ) : null;
        return `
        Title: ${s.title}
        Content: ${s.content}
        Details: ${redactedDetails ? JSON.stringify(redactedDetails) : 'None'}
      `;
      }).join('\n')}
      
      Knowledge Base:
      ${(appData.knowledgeBase || []).map(k => `- ${k.topic}: ${k.content}`).join('\n')}
      
      Holidays & Key Dates:
      ${KEY_DATES.map(k => `- ${k.date}: ${k.title}`).join('\n')}
      ${FINANCIAL_EVENTS.map(f => `- ${f.date}: ${f.title} (${f.amount})`).join('\n')}
      ${(appData.holidays || []).map(h => `- ${h.date}: ${h.name}`).join('\n')}
      
      Saved Links:
      ${appData.publicLinks.map(l => `- ${l.title}: ${l.url}`).join('\n')}

      Deployment & Technical Docs:
      ${DEPLOYMENT_DOCS}

      Company Assets (Zoom Backgrounds):
      ${COMPANY_ASSETS.map(a => `- ${a.title}: ${a.url}`).join('\n')}

      --- ATC TRAINING RAG SYSTEM ---
      ${formatATCRagForAI()}
    `;

    const model = ai!.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`
        System Context: ${context}
        
        User Query: ${query}
        
        Instruction: Answer the user's question based on the provided context. 
        - If the user asks about salary, calculate based on the hourly rate ($55.29) if needed.
        - If the user asks about past notes (e.g., "what did I do 3 days ago" or "wifi password note"), SEARCH the "Daily Notes History" and "Quick Notes" sections thoroughly.
        - If the answer is found in the secrets/vault, provide it but briefly mention it is sensitive data.
        - If the user asks about ATC training files, RAG system, Python scripts, file locations, API keys, deployment, or training courses, refer to the "ATC Training RAG System" section for detailed information.
        - For ATC RAG questions, provide file paths, setup instructions, API configuration, and troubleshooting steps clearly.
        - Be helpful, professional, and concise.
      `);
    const response = await result.response;
    return response.text() || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to the AI. Please try again.";
  }
};

export const processBrainAdaptation = async (prompt: string, systemInstruction: string): Promise<string> => {
  if (!ai && !initializeAI()) {
    return "AI Service Unavailable (Missing API Key). Please enter your key in the Chatbot.";
  }

  try {
    const model = ai!.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
      contents: prompt,
      systemInstruction: systemInstruction
    });
    const response = await result.response;
    return response.text() || "No data generated.";
  } catch (error: any) {
    console.error("Brain AI Error:", error);
    return `Error: ${error?.message || 'Failed to process adaptation. Please try again.'}`;
  }
};
