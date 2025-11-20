import { GoogleGenAI, Type } from "@google/genai";
import { Aircraft, GameScenario, AlertLevel } from "../types";
import { CENTER, GATE_RADIUS } from "../constants";

// API KEY
const ai = new GoogleGenAI({ apiKey: "AIzaSyClXVTFdo-dxJsjutZmfGg4JMbiSB10s6M" });

// Helper to get coordinate
const getStartPos = (deg: number, dist: number) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return {
        x: CENTER + dist * Math.cos(rad),
        y: CENTER + dist * Math.sin(rad)
    };
};

export const generateScenario = async (difficulty: string): Promise<GameScenario> => {
    // Default settings
    let countRange = "12-15";
    let speedRange = "210-250";
    
    if (difficulty === 'Easy') { countRange = "5-8"; speedRange = "180-220"; }
    else if (difficulty === 'Medium') { countRange = "8-12"; speedRange = "200-240"; }

    const prompt = `
    Generate an ATC scenario with ${countRange} aircraft.
    Callsigns: Major US Airlines.
    Aircraft Types: B737, A320, B738.
    Altitudes: 50 to 140.
    Speeds: ${speedRange} knots.
    `;

  try {
    // Using 1.5-flash as it is more stable for general keys than 2.5
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            aircraft: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  callsign: { type: Type.STRING },
                  type: { type: Type.STRING },
                  altitude: { type: Type.NUMBER },
                  speed: { type: Type.NUMBER },
                },
                required: ["callsign", "type", "altitude", "speed"]
              }
            }
          },
          required: ["name", "description", "aircraft"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    const spawnZones = [
        { id: 'NE', min: 60, max: 80, exitOptions: ['SOU', 'WES'] }, 
        { id: 'SE', min: 130, max: 170, exitOptions: ['NOR', 'WES'] },
        { id: 'SW', min: 220, max: 260, exitOptions: ['NOR', 'EAS'] },
        { id: 'NW', min: 310, max: 350, exitOptions: ['SOU', 'EAS'] }
    ];

    const generatedAircraft: Aircraft[] = [];
    // ... (Logic condensed for brevity, full generation logic normally goes here) ...
    
    // RE-INSERTING FULL LOGIC TO ENSURE IT WORKS WHEN API SUCCEEDS
    const usedCallsigns = new Set<string>();
    const BACKUP_AIRLINES = ['UAL', 'AAL', 'SWA', 'DAL', 'SKW', 'ASH'];

    data.aircraft.forEach((ac: any, index: number) => {
        let finalCallsign = ac.callsign.toUpperCase().replace(/\s+/g, '');
        while (usedCallsigns.has(finalCallsign)) {
            const airline = BACKUP_AIRLINES[Math.floor(Math.random() * BACKUP_AIRLINES.length)];
            const num = Math.floor(Math.random() * 900) + 100;
            finalCallsign = `${airline}${num}`;
        }
        usedCallsigns.add(finalCallsign);

        const zone = spawnZones[index % spawnZones.length];
        let validPosFound = false;
        let pos = { x: 0, y: 0 };
        let heading = 0;
        
        // Simple placement logic
        const angle = Math.floor(Math.random() * (zone.max - zone.min + 1)) + zone.min;
        const dist = GATE_RADIUS + 100 + (index * 30);
        pos = getStartPos(angle, dist);
        heading = (angle + 180 + (Math.random() * 30 - 15)) % 360;

        const destId = zone.exitOptions[Math.floor(Math.random() * zone.exitOptions.length)];
        let safeAlt = ac.altitude;
        if (safeAlt > 200) safeAlt = Math.round(safeAlt / 100);

        generatedAircraft.push({
            id: `ac-${index}-${Date.now()}`,
            callsign: finalCallsign,
            type: ac.type,
            x: pos.x,
            y: pos.y,
            heading: heading,
            targetHeading: heading,
            altitude: safeAlt,
            targetAltitude: safeAlt,
            speed: ac.speed,
            targetSpeed: ac.speed,
            history: [],
            status: 'INBOUND', 
            cleared: false,
            alertLevel: AlertLevel.NONE,
            messages: [`Checking in.`],
            isSelected: false,
            destination: destId,
            dataBlockDir: 45 
        });
    });

    return {
      name: "Sector Control",
      difficulty: difficulty as any,
      description: "AI Generated Scenario",
      aircraft: generatedAircraft
    };

  } catch (error) {
    console.error("Error generating scenario:", error);
    
    // --- FALLBACK SCENARIO (This runs if API fails) ---
    const now = Date.now();
    return {
      name: "Offline Backup",
      difficulty: "Easy",
      description: "API Connection Failed - Running Backup Scenario",
      aircraft: [
        {
            id: `fallback-1-${now}`,
            callsign: "UAL101",
            type: "B737",
            x: CENTER + 200, // NE
            y: CENTER - 200,
            heading: 225,
            targetHeading: 225,
            altitude: 120,
            targetAltitude: 120,
            speed: 240,
            targetSpeed: 240,
            history: [],
            status: 'INBOUND',
            cleared: false,
            alertLevel: AlertLevel.NONE,
            messages: ["Manual Backup Loaded"],
            isSelected: false,
            destination: "SOU",
            dataBlockDir: 45
        },
        {
            id: `fallback-2-${now}`,
            callsign: "AAL555",
            type: "A320",
            x: CENTER - 200, // SW
            y: CENTER + 200,
            heading: 45,
            targetHeading: 45,
            altitude: 90,
            targetAltitude: 90,
            speed: 220,
            targetSpeed: 220,
            history: [],
            status: 'INBOUND',
            cleared: false,
            alertLevel: AlertLevel.NONE,
            messages: ["Manual Backup Loaded"],
            isSelected: false,
            destination: "NOR",
            dataBlockDir: 45
        },
        {
            id: `fallback-3-${now}`,
            callsign: "DAL888",
            type: "B738",
            x: CENTER - 200, // NW
            y: CENTER - 200,
            heading: 135,
            targetHeading: 135,
            altitude: 70,
            targetAltitude: 70,
            speed: 200,
            targetSpeed: 200,
            history: [],
            status: 'INBOUND',
            cleared: false,
            alertLevel: AlertLevel.NONE,
            messages: ["Manual Backup Loaded"],
            isSelected: false,
            destination: "EAS",
            dataBlockDir: 45
        }
      ]
    };
  }
};

export const getPilotResponse = async (callsign: string, instruction: string): Promise<string> => {
    return `ROGER, ${callsign}`;
};
