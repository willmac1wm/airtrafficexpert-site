import React, { useState, useEffect, useRef } from 'react';
import { Shield, Unlock, Lock, Upload, FileText, Download, LogOut, LayoutGrid, AlertTriangle, Users, GripVertical, PartyPopper, Send, Cloud, CheckCircle2, RefreshCw, AlertCircle, X, Trash2, Brain as BrainIcon } from 'lucide-react';
import LinkCard from './components/LinkCard';
import SecretCard from './components/SecretCard';
import AdminPanel from './components/AdminPanel';
import TimeCalculator from './components/TimeCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import ZoomBackgrounds from './components/ZoomBackgrounds';
import ScheduleCalendar from './components/ScheduleCalendar';
import PerformanceLog from './components/PerformanceLog';
import CompanyResources from './components/CompanyResources';
import Directory from './components/Directory';
import DailyNotes from './components/DailyNotes';
import QuickNotes from './components/QuickNotes';
import ChatBot from './components/ChatBot';
import Brain from './components/Brain';
import { getStoredData, saveStoredData, checkAndArchiveNotes, getCloudConfig, cloudUpdate, cloudLoad } from './services/storageService';
import { AppData, UploadedFile } from './types';
import { getAccessCode, DEFAULT_LAYOUT_ORDER, KEY_DATES } from './constants';

function App() {
  const [data, setData] = useState<AppData>({ 
    publicLinks: [], 
    secrets: [], 
    performanceLogs: [], 
    dailyNotes: [],
    quickNotes: '',
    directory: [], 
    knowledgeBase: [], 
    holidays: [],
    currentNote: '',
    currentTomorrowNote: '',
    lastNoteDate: '',
    layoutOrder: DEFAULT_LAYOUT_ORDER 
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);
  const [isFirstDay, setIsFirstDay] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved' | 'error'>('idle');
  
  // File upload state (now persisted)
  const [files, setFiles] = useState<UploadedFile[]>(data.uploadedFiles || []);

  // Drag and Drop Refs
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  
  // Auto-sync timer ref
  const autoSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Function to pull latest data from cloud
  const pullFromCloud = async (showStatus = true) => {
    const { key, binId } = getCloudConfig();
    if (!key || !binId) return;

    if (showStatus) setSyncStatus('syncing');
    try {
      const cloudData = await cloudLoad(key, binId);
      // Only update if cloud data is different (check lastNoteDate as a simple diff)
      const localData = getStoredData();
      const cloudTimestamp = cloudData.lastNoteDate || '';
      const localTimestamp = localData.lastNoteDate || '';
      
      // Check if cloud has newer data by comparing content
      const cloudStr = JSON.stringify(cloudData);
      const localStr = JSON.stringify(localData);
      
      if (cloudStr !== localStr) {
        setData(cloudData);
        saveStoredData(cloudData);
        if (showStatus) {
          setLastSaved(new Date());
        }
      }
      if (showStatus) setSyncStatus('saved');
    } catch (err) {
      console.error("Cloud pull failed:", err);
      if (showStatus) setSyncStatus('error');
    }
  };

  useEffect(() => {
    // Check for archive status on load
    const initializeData = async () => {
      const updatedData = await checkAndArchiveNotes();
      setData(updatedData);

      // Auto-pull from cloud on load (if cloud is configured)
      await pullFromCloud(true);
    };
    initializeData();

    // Check if today is the delayed start date (Dec 1, 2025)
    const todayStr = new Date().toISOString().split('T')[0];
    const startDate = KEY_DATES.find(k => k.title.includes('Employment') && k.date === '2025-12-01');
    if (startDate && startDate.date === todayStr) {
      setIsFirstDay(true);
    }

    // Trigger plane animation on mount
    setHasAnimated(true);

    // Set up periodic sync every 30 seconds to check for changes from other devices
    const syncInterval = setInterval(() => {
      const { key, binId } = getCloudConfig();
      if (key && binId) {
        pullFromCloud(false); // Silent pull, don't show syncing status
      }
    }, 30000); // Every 30 seconds

    // Also pull when window regains focus (user switches back to app)
    const handleFocus = () => {
      const { key, binId } = getCloudConfig();
      if (key && binId) {
        pullFromCloud(false);
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Auto-sync to cloud when data changes (debounced)
  useEffect(() => {
    if (!isAuthenticated) return; // Don't sync if locked

    // Clear existing timer
    if (autoSyncTimer.current) {
      clearTimeout(autoSyncTimer.current);
    }

    setSyncStatus('syncing');
    
    // Debounce: wait 2 seconds after last change before syncing
    autoSyncTimer.current = setTimeout(async () => {
      // Always save locally first
      saveStoredData(data);
      
      // Then sync to cloud if configured
      const { key, binId } = getCloudConfig();
      if (key && binId) {
        try {
          await cloudUpdate(key, binId, data);
          setSyncStatus('saved');
          setLastSaved(new Date());
        } catch (err) {
          console.error("Auto-sync to cloud failed:", err);
          setSyncStatus('error');
          // Still mark as saved locally
          setLastSaved(new Date());
        }
      } else {
        // No cloud configured, just local save
        setSyncStatus('saved');
        setLastSaved(new Date());
      }
    }, 2000); // 2 second debounce

    return () => {
      if (autoSyncTimer.current) {
        clearTimeout(autoSyncTimer.current);
      }
    };
  }, [data, isAuthenticated]);

  const refreshData = () => {
    setData(getStoredData());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const accessCode = getAccessCode();
    if (accessCode && passwordInput === accessCode) {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdmin(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      
      // Validate file size (max 2MB for base64 storage)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (newFile.size > maxSize) {
        alert('File size exceeds 2MB limit. For larger files, use cloud storage.');
        e.target.value = ''; // Reset input
        return;
      }
      
      // Convert to base64 for persistence
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const fileEntry: UploadedFile = {
          id: Date.now().toString(),
          name: newFile.name,
          size: newFile.size,
          type: newFile.type,
          url: dataUrl, // Use data URL directly
          dataUrl: dataUrl
        };
        const newFiles = [...files, fileEntry];
        setFiles(newFiles);
        
        // Save to persistent storage
        const newData = { ...data, uploadedFiles: newFiles };
        setData(newData);
        saveStoredData(newData);
      };
      reader.readAsDataURL(newFile);
      e.target.value = ''; // Reset input
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    
    // Save to persistent storage
    const newData = { ...data, uploadedFiles: newFiles };
    setData(newData);
    saveStoredData(newData);
  };

  // Load files from stored data when data changes
  useEffect(() => {
    if (data.uploadedFiles && data.uploadedFiles.length > 0) {
      setFiles(data.uploadedFiles);
    }
  }, [data.uploadedFiles]);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    // Create deep copy of the layout order
    const _layoutOrder = [...(data.layoutOrder || DEFAULT_LAYOUT_ORDER)];
    
    // Remove the dragged item
    const draggedItemContent = _layoutOrder.splice(dragItem.current, 1)[0];
    
    // Insert it at new position
    _layoutOrder.splice(dragOverItem.current, 0, draggedItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;

    // Update state and save
    const newData = { ...data, layoutOrder: _layoutOrder };
    setData(newData);
    saveStoredData(newData);
  };

  // Render Section Helper
  const renderSection = (id: string) => {
    switch (id) {
      case 'quick-notes':
        return <QuickNotes content={data.quickNotes || ''} onUpdate={refreshData} />;
      case 'daily-notes':
        return <DailyNotes currentNote={data.currentNote} currentTomorrowNote={data.currentTomorrowNote} onUpdate={refreshData} />;
      case 'time-calculator':
        return <TimeCalculator />;
      case 'salary-calculator':
        return <SalaryCalculator />;
      case 'schedule-calendar':
        return <ScheduleCalendar appData={data} />;
      case 'performance-log':
        return <PerformanceLog logs={data.performanceLogs || []} onUpdate={refreshData} />;
      case 'company-resources':
        return <CompanyResources />;
      case 'directory':
        return (
          <button 
            onClick={() => setShowDirectory(true)}
            className="w-full mb-6 py-3 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl text-purple-200 font-medium transition-all flex items-center justify-center gap-2 group"
          >
            <Users className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" /> 
            Open Company Directory
          </button>
        );
      case 'public-resources':
        return (
          <div className="space-y-3 mb-6">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 mb-2">Public Resources</h2>
            {data.publicLinks.map(link => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-3 mb-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Documents</h2>
                {isAuthenticated && (
                  <label className="cursor-pointer text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1 transition-colors">
                    <Upload className="w-3 h-3" /> Upload
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                )}
             </div>
             
             {files.length === 0 ? (
               <div className="p-4 border border-dashed border-slate-700 rounded-xl text-center text-slate-500 text-sm">
                 No files uploaded yet. (Max 2MB per file)
               </div>
             ) : (
               files.map(file => (
                 <div key={file.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                   <div className="flex items-center gap-3 overflow-hidden">
                     <div className="p-2 bg-slate-700 rounded text-slate-300">
                       <FileText className="w-4 h-4" />
                     </div>
                     <div className="truncate">
                       <p className="text-sm text-slate-200 truncate font-medium">{file.name}</p>
                       <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-1">
                     <a 
                      href={file.url || file.dataUrl} 
                      download={file.name}
                      className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-full transition-all"
                      title="Download"
                     >
                       <Download className="w-4 h-4" />
                     </a>
                     {isAuthenticated && (
                       <button
                         onClick={() => handleDeleteFile(file.id)}
                         className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-full transition-all"
                         title="Delete"
                       >
                         <X className="w-4 h-4" />
                       </button>
                     )}
                   </div>
                 </div>
               ))
             )}
          </div>
        );
      case 'zoom-backgrounds':
        return <ZoomBackgrounds />;
      case 'brain':
        return (
          <button 
            onClick={() => setShowBrain(true)}
            className="w-full mb-6 py-3 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-xl text-emerald-200 font-medium transition-all flex items-center justify-center gap-2 group"
          >
            <BrainIcon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" /> 
            Open FDTS Adaptation Specialist
          </button>
        );
      default:
        return null;
    }
  };

  const layoutOrder = data.layoutOrder || DEFAULT_LAYOUT_ORDER;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-md w-full space-y-8 relative">
        
        {/* Profile Header (Fixed) */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Swoosh Trail */}
            <svg 
              className={`absolute -top-8 -left-12 w-32 h-16 pointer-events-none ${hasAnimated ? 'animate-swoosh' : 'opacity-0'}`}
              viewBox="0 0 100 50"
              style={{ transform: 'rotate(-20deg)' }}
            >
              <path
                d="M 0 25 Q 30 10, 50 20 T 100 25"
                stroke="url(#swooshGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="swooshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className={`w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 mx-auto mb-4 shadow-lg shadow-cyan-500/20 flex items-center justify-center ${hasAnimated ? 'animate-plane-land' : 'opacity-0'}`}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-4 border-slate-900 relative overflow-hidden">
                <Send 
                  className={`w-10 h-10 text-white ${hasAnimated ? 'animate-plane-rotate' : ''}`}
                  style={{ transform: 'rotate(45deg)' }}
                />
              </div>
            </div>
            {isAuthenticated && (
              <div className="absolute bottom-2 right-0 bg-green-500 rounded-full p-1.5 border-4 border-slate-900 animate-in fade-in duration-500" title="Authenticated">
                <Shield className="w-3 h-3 text-slate-900" fill="currentColor" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">DTIS Portal</h1>
          <p className="mt-2 text-slate-400 font-medium">Della Terra Insù</p>
          <p className="text-xs text-slate-500 italic">"From the ground up"</p>
        </div>

        {/* First Day Welcome Banner */}
        {isAuthenticated && isFirstDay && (
          <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-4 flex gap-3 animate-in slide-in-from-top-4 fade-in duration-700">
             <div className="p-2 bg-blue-500/20 rounded-full h-fit">
               <PartyPopper className="w-6 h-6 text-blue-300" />
             </div>
             <div>
               <h3 className="text-blue-100 font-bold text-sm">Welcome Aboard, William!</h3>
               <p className="text-blue-300/80 text-xs mt-1 leading-relaxed">
                 Today is your official start date (Delayed from Nov 3 due to Government Shutdown). 
                 <br/><br/>
                 Please report to <strong>William J. Hughes Technical Center</strong>.
               </p>
             </div>
          </div>
        )}

        {/* Draggable Dashboard Sections */}
        <div className="space-y-1 relative">
          {layoutOrder.map((sectionId, index) => (
            <div
              key={sectionId}
              draggable
              onDragStart={(e) => {
                dragItem.current = index;
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragEnter={(e) => {
                dragOverItem.current = index;
              }}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className="relative group touch-none rounded-xl transition-all duration-200"
            >
              {/* Drag Handle - Visible on Hover */}
              <div 
                className="absolute -left-8 top-1/4 p-2 cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block"
                title="Drag to reorder"
              >
                 <GripVertical size={20} />
              </div>
              
              {/* Actual Content */}
              {renderSection(sectionId)}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 my-8"></div>

        {/* Secure Section Logic (Fixed at Bottom) */}
        {!isAuthenticated ? (
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 text-center backdrop-blur-sm">
            <Lock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Restricted Access</h3>
            <form onSubmit={handleLogin} className="relative">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Access Code"
                className={`w-full bg-black/30 border ${authError ? 'border-red-500/50 text-red-200' : 'border-slate-700 text-white'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600`}
              />
              <Shield className={`w-4 h-4 absolute left-3.5 top-3.5 ${authError ? 'text-red-500' : 'text-slate-600'}`} />
              
              <button 
                type="submit"
                className="mt-3 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Unlock className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                Unlock Vault
              </button>
            </form>
            {authError && <p className="text-red-500 text-xs mt-2">Incorrect access code.</p>}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Vault Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" fill="currentColor" /> 
                Secure Vault
              </h2>
              <button 
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1.5 bg-red-950/30 rounded-full border border-red-900/50 transition-colors"
              >
                <LogOut className="w-3 h-3" /> Lock
              </button>
            </div>

            {/* Secret List */}
            <div>
              {data.secrets.length === 0 ? (
                <p className="text-slate-500 text-sm italic">Vault is empty.</p>
              ) : (
                data.secrets.map(secret => (
                  <SecretCard key={secret.id} secret={secret} />
                ))
              )}
            </div>

            {/* Admin Controls */}
            {!showAdmin ? (
              <button 
                onClick={() => setShowAdmin(true)}
                className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <LayoutGrid className="w-4 h-4" /> Open Admin Dashboard
              </button>
            ) : (
              <AdminPanel 
                onUpdate={(newData) => {
                  setData(newData);
                }} 
                onClose={() => setShowAdmin(false)} 
              />
            )}

            {/* Security Warning */}
            <div className="bg-yellow-900/20 border border-yellow-700/30 p-3 rounded-lg flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
              <p className="text-xs text-yellow-500/80 leading-relaxed">
                <strong>Demo Mode:</strong> Data is saved in your browser's Local Storage. 
                Do not store real banking passwords or highly sensitive PII here as it is not encrypted at rest on the server.
              </p>
            </div>

          </div>
        )}

        {/* Sync Status Footer */}
        {isAuthenticated && (
          <footer className="text-center text-slate-600 text-xs py-4 mt-8 border-t border-slate-800/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              {syncStatus === 'syncing' && (
                <>
                  <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
                  <span className="text-cyan-400">Syncing to cloud...</span>
                </>
              )}
              {syncStatus === 'saved' && (
                <>
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">
                    {getCloudConfig().key && getCloudConfig().binId ? 'Synced to cloud' : 'Saved locally'}
                  </span>
                  {lastSaved && (
                    <span className="text-slate-500 ml-2">
                      • {lastSaved.toLocaleTimeString()}
                    </span>
                  )}
                </>
              )}
              {syncStatus === 'error' && (
                <>
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span className="text-red-400">Sync error - check Admin Panel</span>
                </>
              )}
              {syncStatus === 'idle' && getCloudConfig().key && getCloudConfig().binId && (
                <>
                  <Cloud className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500">Cloud sync enabled</span>
                </>
              )}
            </div>
            <p className="text-slate-500">© {new Date().getFullYear()} DTIS. All rights reserved.</p>
          </footer>
        )}
        
        {!isAuthenticated && (
          <footer className="text-center text-slate-600 text-xs py-4">
            <p>© {new Date().getFullYear()} DTIS. All rights reserved.</p>
          </footer>
        )}

        {/* Directory Modal */}
        <Directory isOpen={showDirectory} onClose={() => setShowDirectory(false)} contacts={data.directory || []} />

        {/* Brain Modal */}
        <Brain isOpen={showBrain} onClose={() => setShowBrain(false)} />

        {/* DTIS Assistant Chatbot */}
        {isAuthenticated && <ChatBot appData={data} />}

      </div>
    </div>
  );
}

export default App;