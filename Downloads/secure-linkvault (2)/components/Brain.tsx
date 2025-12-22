import React, { useState, useRef, useEffect } from 'react';
import { X, Brain as BrainIcon, FileUp, Trash2, Send, Terminal, Cpu, LayoutDashboard, Zap, Database, Search, Filter, FileCode, ClipboardCheck, Copy, Download, Check, Sparkles, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { processBrainAdaptation } from '../services/aiService';

interface BrainProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  name: string;
  content: string;
  size: number;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const BASE_SYSTEM_INSTRUCTION = `You are the FDTS Adaptation Specialist. Your task is to extract data from facility SOPs and raw logs to populate the "FDTS_Routing_Data_Sheet" master workbook.

### FACILITY INTELLIGENCE REQUIREMENTS:
1.  **AOI (Area of Interest)**: Identify lateral boundaries (e.g. 7NM, 10NM) and vertical limits (e.g. 10,000ft, surface to 4k).
2.  **Fix Departure Abbreviations**: Check if the SOP specifies abbreviations (e.g., "CLT" for Charlotte, "BCH" for Beach). 
    - If abbreviations ARE used, generate a separate "FIXES DATA" table.
    - If NOT used, state "Fixes Tab: Not Required".

### SPREADSHEET POPULATION RULES (Nate Lamb Standard):
1.  **TFDM Role IDs**: This column MUST ALWAYS BE BLANK.
2.  **Clean Data Only**: Do not include Excel metadata, zoom levels, or sheet headers. Provide only the table rows.
3.  **Columns**: [Departure Point] | [Arrival/Fix] | [Altitude/Condition] | [Printer/Position] | [Font] | [TFDM Role ID (BLANK)]
4.  **Fonts**: Use standard FDIO sizes: 8A, 8B, 10, 11, 12, 13, 14, 15, 16, 17, 18.

### OUTPUT FORMAT:
Summarize the Intelligence first (AOI and Fix Usage), then provide the Routing Table in Markdown format.
`;

const PRELOADED_BRAIN: UploadedFile[] = [
  {
    name: "Submission_Protocol.txt",
    content: "General Submission Rules: TFDM Role IDs = BLANK. Fixes tab conditional on abbreviations. Copy only table contents. Lead: Nate Lamb.",
    size: 400
  }
];

const exportToCSV = (markdown: string, siteName: string) => {
  const lines = markdown.split('\n');
  const tableLines = lines.filter(l => l.includes('|') && !l.includes('---'));
  if (tableLines.length === 0) return;

  const csvContent = tableLines.map(line => {
    return line.split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '')
      .map(cell => `"${cell}"`)
      .join(',');
  }).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `FDTS_Sheet_${siteName || 'Adaptation'}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const MessageBubble: React.FC<{ msg: Message; isLoading?: boolean }> = ({ msg, isLoading }) => (
  <div className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-6 group`}>
    <div className={`relative max-w-[90%] rounded-2xl p-4 transition-all ${
      msg.role === 'user' 
        ? 'bg-blue-600 text-white shadow-lg rounded-tr-none' 
        : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none shadow-xl'
    }`}>
      <div className={`absolute -top-3 ${msg.role === 'user' ? '-right-2' : '-left-2'} 
        flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border
        ${msg.role === 'user' ? 'bg-blue-900 border-blue-700 text-blue-200' : 'bg-slate-900 border-slate-700 text-emerald-400'}`}>
        {msg.role === 'user' ? <Terminal size={10} /> : <Cpu size={10} />}
        <span>{msg.role === 'user' ? 'OPR' : 'SYS'}</span>
      </div>

      {isLoading ? (
        <div className="flex space-x-2 items-center h-6 px-2">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none prose-sm prose-p:leading-relaxed prose-pre:bg-slate-950 prose-table:my-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
        </div>
      )}
    </div>
  </div>
);

const Brain: React.FC<BrainProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'chat' | 'workspace'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "### Adaptation Specialist Ready \n\nI can process any facility SOP to extract **AOI** and **Fix Usage** parameters. \n\nWhen you upload a facility document, I will generate a clean **Routing Data Sheet** table with the TFDM Role IDs left blank, ready for Nate Lamb's review."
    }
  ]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>(PRELOADED_BRAIN);
  const [isThinking, setIsThinking] = useState(false);
  
  const [sourceData, setSourceData] = useState('');
  const [adaptedData, setAdaptedData] = useState('');
  const [siteIntelligence, setSiteIntelligence] = useState({ aoi: 'Awaiting SOP...', fixUsage: 'Awaiting SOP...' });
  const [targetAirport, setTargetAirport] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const text = await file.text();
      setFiles(prev => [...prev, { name: file.name, content: text, size: file.size }]);
    }
  };

  const handleSend = async (customPrompt?: string, target: 'chat' | 'workspace' = 'chat') => {
    const promptText = customPrompt || input;
    if (!promptText.trim() || isThinking) return;

    if (target === 'chat') {
      setInput('');
      setMessages(prev => [...prev, { role: 'user', text: promptText }]);
    }
    
    setIsThinking(true);

    try {
      let fullInstruction = BASE_SYSTEM_INSTRUCTION + "\n\n=== CURRENT FACILITY CONTEXT ===\n";
      files.forEach(f => {
        fullInstruction += `\n[SOP SOURCE: ${f.name}]\n${f.content}\n`;
      });

      const text = await processBrainAdaptation(promptText, fullInstruction);

      if (target === 'chat') {
        setMessages(prev => [...prev, { role: 'model', text }]);
      } else {
        const aoiMatch = text.match(/(?:AOI|Area of Interest):? (.*?)(?:\n|$)/i);
        const fixMatch = text.match(/(?:Fix Usage|Fixes):? (.*?)(?:\n|$)/i);
        
        if (aoiMatch || fixMatch) {
          setSiteIntelligence({
            aoi: aoiMatch ? aoiMatch[1].trim() : siteIntelligence.aoi,
            fixUsage: fixMatch ? fixMatch[1].trim() : siteIntelligence.fixUsage
          });
        }
        setAdaptedData(text);
      }
    } catch (error) {
      const errorMsg = `**Error**: ${error instanceof Error ? error.message : 'Unknown error'}`;
      if (target === 'chat') {
        setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
      } else {
        setAdaptedData(errorMsg);
      }
    } finally {
      setIsThinking(false);
    }
  };

  const runAdaptation = () => {
    const airportCode = targetAirport || "Facility";
    const adaptationPrompt = `PROCESS ADAPTATION FOR: ${airportCode}\n\nDATA TO POPULATE SHEET:\n${sourceData}\n\nREQUIREMENT: Produce the "FDTS_Routing_Data_Sheet" table content. Identify AOI and Fix Usage from the uploaded SOP first.`;
    handleSend(adaptationPrompt, 'workspace');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-7xl h-[95vh] shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <BrainIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">FDTS Adaptation Specialist</h3>
              <p className="text-xs text-slate-400">Process facility SOPs and extract routing data</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
            <nav className="flex-1 overflow-y-auto p-3 space-y-2">
              <button 
                onClick={() => setView('chat')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${view === 'chat' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300 border border-transparent'}`}
              >
                <LayoutDashboard size={18} />
                <span className="font-semibold text-sm">Main Hub</span>
              </button>
              <button 
                onClick={() => setView('workspace')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${view === 'workspace' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300 border border-transparent'}`}
              >
                <Zap size={18} />
                <span className="font-semibold text-sm">Adaptation Lab</span>
              </button>

              <div className="pt-6">
                <h2 className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
                  <Database size={10} /> Active Context
                </h2>
                <div className="space-y-1">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between px-3 py-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors group">
                      <span className="flex items-center gap-2 truncate pr-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        {file.name}
                      </span>
                      <Trash2 size={12} className="opacity-0 group-hover:opacity-100 text-red-500 cursor-pointer" onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))} />
                    </div>
                  ))}
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
              <label className="cursor-pointer w-full flex items-center justify-center gap-2 p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all">
                <FileUp size={16} />
                <span className="text-xs font-bold uppercase">Upload SOP</span>
                <input type="file" className="hidden" multiple onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
            {view === 'chat' ? (
              <>
                <div className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-900/20 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-200 uppercase">System Live</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500"/>
                    <span className="text-[10px] font-bold uppercase">Nate Lamb Standards</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                  <div className="max-w-4xl mx-auto pb-20">
                    {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
                    {isThinking && <MessageBubble msg={{role: 'model', text: ''}} isLoading={true} />}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                      <textarea 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder="Ask about a facility or request sheet extraction..."
                        className="w-full bg-transparent p-4 h-24 text-sm resize-none focus:outline-none"
                      />
                      <div className="flex items-center justify-between px-4 pb-3">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Nate Lamb Standards Active</span>
                        <button 
                          onClick={() => handleSend()}
                          disabled={!input.trim() || isThinking}
                          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                        >
                          <Send size={14} />
                          ANALYZE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6 shrink-0 bg-slate-900/30 p-4 rounded-3xl border border-slate-800 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-100">Adaptation Lab</h2>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Intelligent Extraction Mode</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="text"
                      value={targetAirport}
                      onChange={e => setTargetAirport(e.target.value.toUpperCase())}
                      placeholder="Facility ID"
                      className="w-40 bg-slate-950 border border-slate-700 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500/50 uppercase"
                    />
                    <button 
                      onClick={runAdaptation}
                      disabled={!sourceData || isThinking}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      {isThinking ? <Cpu className="animate-spin" size={16}/> : <Sparkles size={16}/>}
                      POPULATE SHEET
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 shrink-0">
                   <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Search size={20}/></div>
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Facility AOI</h4>
                        <p className="text-sm text-slate-200 font-semibold">{siteIntelligence.aoi}</p>
                      </div>
                   </div>
                   <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Filter size={20}/></div>
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Fix Departure Logic</h4>
                        <p className="text-sm text-slate-200 font-semibold">{siteIntelligence.fixUsage}</p>
                      </div>
                   </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 overflow-hidden">
                  <div className="flex flex-col min-h-0 bg-slate-900/20 border border-slate-800 rounded-3xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FileCode size={16} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Source Routing Data</span>
                      </div>
                      <button onClick={() => setSourceData('')} className="text-[10px] text-slate-600 hover:text-red-400">
                        <Trash2 size={10}/> Clear
                      </button>
                    </div>
                    <textarea 
                      value={sourceData}
                      onChange={e => setSourceData(e.target.value)}
                      placeholder="Paste OCR text, raw logs, or routing fragments here..."
                      className="flex-1 bg-slate-950/40 border border-slate-800/50 rounded-2xl p-6 text-sm font-mono focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-col min-h-0 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-3xl p-5 overflow-hidden">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                       <div className="flex items-center gap-2">
                        <ClipboardCheck size={16} className="text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Populated Sheet</span>
                       </div>
                       {adaptedData && (
                        <button 
                          onClick={() => navigator.clipboard.writeText(adaptedData)}
                          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <Copy size={12}/> COPY
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1 bg-slate-950/70 border border-slate-800/50 rounded-2xl overflow-hidden flex flex-col relative">
                      {isThinking && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90">
                           <div className="relative w-24 h-24">
                              <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
                              <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-emerald-500"><Search size={28} /></div>
                           </div>
                           <p className="text-[11px] font-bold text-emerald-500 mt-8 uppercase">Adapting to Master Standards</p>
                        </div>
                      )}
                      
                      <textarea 
                        value={adaptedData}
                        onChange={e => setAdaptedData(e.target.value)}
                        className="flex-1 bg-transparent p-6 text-sm font-mono focus:outline-none resize-none"
                        placeholder="Sheet-ready data will populate here..."
                      />
                      
                      <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase px-3 py-1 bg-slate-950/50 rounded-full">
                          <Check size={12} className="text-emerald-500"/>
                          Ready for review
                        </div>
                        <button 
                          onClick={() => exportToCSV(adaptedData, targetAirport)}
                          disabled={!adaptedData}
                          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                        >
                          <Download size={14} />
                          Export CSV
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brain;
