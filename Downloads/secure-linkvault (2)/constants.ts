
import { AppData, PublicLink, SecretItem, Contact, KnowledgeItem, Holiday } from './types';

// SECURITY WARNING:
// This application uses Client-Side Authentication. The access code below prevents casual access
// but is not encrypted. Do not store high-value financial credentials (banking, SSN) in this vault.
// Access code should be set via environment variable VITE_ACCESS_CODE or localStorage
export const getAccessCode = (): string => {
  // Use import.meta.env for Vite (process.env is for Node.js)
  const envCode = import.meta.env.VITE_ACCESS_CODE;
  const localCode = localStorage.getItem('dtis_access_code');
  // Fallback to default for development - remove in production or set via .env.local
  return envCode || localCode || '4810';
};

// API KEYS
// These can be set via environment variables (.env.local) or localStorage
// Fallback defaults are provided for development - set your own keys in .env.local for security
export const getGeminiKey = (): string => {
  // Use import.meta.env for Vite (process.env is for Node.js)
  const envKey = import.meta.env.VITE_API_KEY;
  const localKey = localStorage.getItem('dtis_genai_key');
  // Fallback for development
  return envKey || localKey || 'AIzaSyBXsjT5MXCHyCdGLSRZeI7dZ0hGx_UDP8Y';
};

export const getJsonBinKey = (): string => {
  // Use import.meta.env for Vite (process.env is for Node.js)
  const envKey = import.meta.env.VITE_JSONBIN_KEY;
  const localKey = localStorage.getItem('dtis_cloud_key');
  // Fallback for development
  return envKey || localKey || '$2a$10$WZdHAcNS/oDJbTVRJDQl/OYW/WCishApFn8WzDuUSp7ZSzct3s6KG';
};

export const DEFAULT_BIN_ID = ""; 

export const REPO_URL = "https://github.com/willmac1wm/DTISv2";

// DTIS Branding
export const DTIS_LOGO_URL = "https://ui-avatars.com/api/?name=DTIS&background=0f172a&color=06b6d4&size=200&font-size=0.35&length=4&bold=true&rounded=true";

// Reference date for Biweekly cycle (Friday Jan 13, 2023 was a Payday/Report Day)
// This anchors the 14-day cycle for 2025 and 2026 correctly.
export const BIWEEKLY_ANCHOR_DATE = new Date('2023-01-13T12:00:00'); 

export const WEBMAIL_URL = 'https://cp.intermedia.net/ControlPanel/Login?ClientType=WebMail';
export const REPLICON_URL = 'https://login.replicon.com';

export const KEY_DATES = [
  {
    date: '2025-12-01',
    title: 'First Day of Employment',
    description: 'Report to William J. Hughes Technical Center. Start date delayed from Nov 3 due to Government Shutdown.',
    type: 'milestone'
  }
];

export const FINANCIAL_EVENTS = [
  {
    date: '2025-09-02',
    title: 'OPM Annuity Payment',
    amount: '$2,391.75',
    type: 'income',
    details: 'Net Amount (Gross: $3,409.00)'
  }
];

export const DEPLOYMENT_DOCS = `
Vercel Deployment Troubleshooting:
1. Missing public directory: Check 'output directory' (dist).
2. Missing build script: Ensure package.json has "build".
3. 451 Error: Blocked due to Terms of Service.
4. Git Link 404: Ensure you are logged into GitHub and the repo exists.
`;

export const INITIAL_HOLIDAYS: Holiday[] = [
  { id: 'h1', date: '2025-01-01', name: "New Year's Day" },
  { id: 'h2', date: '2025-01-20', name: "Martin Luther King, Jr. Birthday" },
  { id: 'h3', date: '2025-02-17', name: "Washington's Birthday" },
  { id: 'h4', date: '2025-05-26', name: "Memorial Day" },
  { id: 'h5', date: '2025-06-19', name: "Juneteenth National Independence Day" },
  { id: 'h6', date: '2025-07-04', name: "Independence Day" },
  { id: 'h7', date: '2025-09-01', name: "Labor Day" },
  { id: 'h8', date: '2025-10-13', name: "Columbus Day" },
  { id: 'h9', date: '2025-11-11', name: "Veterans Day" },
  { id: 'h10', date: '2025-11-27', name: "Thanksgiving Day" },
  { id: 'h11', date: '2025-12-25', name: "Christmas Day" }
];

export const INITIAL_PUBLIC_LINKS: PublicLink[] = [
  {
    id: '1',
    title: 'DTIS Corporation',
    url: 'https://www.dtis-corp.com',
    icon: 'globe'
  },
  {
    id: '2',
    title: 'Work Webmail',
    url: WEBMAIL_URL,
    icon: 'mail'
  },
  {
    id: '3',
    title: 'Timesheet (Replicon)',
    url: REPLICON_URL,
    icon: 'clock'
  },
  {
    id: '4',
    title: 'Company Share File',
    url: 'https://dtis.hostpilot.com/_layouts/15/start.aspx#/SitePages/Home.aspx',
    icon: 'folder'
  }
];

// NOTE: These are DEFAULT secrets for initial setup. Once data is saved to localStorage,
// these values are NOT used. Update your passwords through the Admin Panel after first login.
export const INITIAL_SECRETS: SecretItem[] = [
  {
    id: 's1',
    title: 'Webmail Credentials',
    content: 'Login details for Intermedia Webmail',
    details: {
      'Email': 'WMacomber@dtis-corp.com',
      'Password': '130County$'
    }
  },
  {
    id: 's2',
    title: 'Timesheet Credentials',
    content: 'Login details for Replicon',
    details: {
      'Company': 'DTIS',
      'Username': 'wmacomber',
      'Password': '130County$'
    }
  },
  {
    id: 's3',
    title: 'Company Share File',
    content: 'SharePoint Home Page for DTIS Documents.',
    details: {
      'URL': 'https://dtis.hostpilot.com/_layouts/15/start.aspx#/SitePages/Home.aspx'
    }
  },
  {
    id: 's4',
    title: 'Timesheet Instructions',
    content: 'Log hours daily in Replicon. Submit bi-weekly on Fridays.',
    details: {
      'System': 'Replicon',
      'Frequency': 'Bi-weekly',
      'Requirement': 'Min 70hrs / Max 80hrs'
    }
  },
  {
    id: 's5',
    title: 'Zoom Calendar Config',
    content: 'Zoom integration settings for Outlook/Webmail.',
    details: {
      'Plugin': 'Zoom for Outlook',
      'SSO Domain': 'dtis-corp'
    }
  },
  {
    id: 's6',
    title: 'Biweekly Report Details',
    content: 'Required header info for Bi-Weekly Status Reports.',
    details: {
      'PO Number': '693KA9-24-F',
      'Task Order': 'TO2400050',
      'Subtask': 'TFDM',
      'Submit To': 'biweekly@dtis-corp.com'
    }
  },
  {
    id: 's7',
    title: 'Daily Email Recipients',
    content: 'Send status emails to these contacts every morning.',
    details: {
      'To': 'Sarah Staab; Joe Longo',
      'Cc': 'Chris'
    }
  },
  {
    id: 's8',
    title: 'IT Help Desk',
    content: 'Contact for technical issues or password resets.',
    details: {
      'Contact': 'Matt Bibb',
      'Email': 'HelpDesk@DTIS-corp.com',
      'Phone': '314-306-5409'
    }
  },
  {
    id: 's9',
    title: 'OPM Annuity Statement',
    content: 'Retirement Services Annuity Statement.',
    details: {
        'Net Annuity': '$2,391.75',
        'Gross': '$3,409.00',
        'Tax (Fed)': '$90.90',
        'Tax (State)': '$65.00'
    }
  }
];

// FULL DTIS DIRECTORY
export const INITIAL_DIRECTORY: Contact[] = [
  { id: 'c001', name: 'Abraham, Dean', email: 'DAbraham@DTIS-corp.com', cell: '480-242-8963' },
  { id: 'c002', name: 'Addai, Emmanuel', email: 'EAddai@DTIS-corp.com', cell: '540-287-4733' },
  { id: 'c003', name: 'Allmond, Christopher', email: 'CAllmond@DTIS-corp.com', cell: '609-457-6376' },
  { id: 'c004', name: 'Andrews, Kyle', email: 'KAndrews@DTIS-corp.com', cell: '847-340-9850' },
  { id: 'c005', name: 'Angelini, Robert', email: 'RAngelini@DTIS-corp.com', cell: '561-513-0737' },
  { id: 'c006', name: 'Arbaugh, Laci', email: 'LArbaugh@DTIS-corp.com', cell: '443-869-1656' },
  { id: 'c007', name: 'Arif, Noah', email: 'NArif@DTIS-corp.com', cell: '703-678-8861' },
  { id: 'c008', name: 'Bennett, Thomas', email: 'TBennett@DTIS-corp.com', cell: '440-503-3832' },
  { id: 'c009', name: 'Boruch, Mary Lou', email: 'MBoruch@DTIS-corp.com', cell: '609-335-4358' },
  { id: 'c010', name: 'Burak, William', email: 'WBurak@DTIS-corp.com', cell: '315-430-7883' },
  { id: 'c011', name: 'Carbone, Peter', email: 'PCarbone@DTIS-corp.com', cell: '978-854-2279' },
  { id: 'c012', name: 'Carr, Nicholas', email: 'NCarr@DTIS-corp.com', cell: '267-315-2706' },
  { id: 'c013', name: 'Carter, Gerald', email: 'GCarter@DTIS-corp.com', cell: '856-842-6600' },
  { id: 'c014', name: 'Crum, Johnie', email: 'JCrum@DTIS-corp.com', cell: '619-549-6471' },
  { id: 'c015', name: 'DeFranco, John', email: 'JDeFranco@DTIS-corp.com', cell: '571-286-9858' },
  { id: 'c016', name: 'DeRoberts, Darin', email: 'DDeRoberts@DTIS-corp.com', cell: '315-382-4161' },
  { id: 'c017', name: 'Douglass, Sean', email: 'SDouglass@DTIS-corp.com', cell: '703-531-7636' },
  { id: 'c018', name: 'Emerson, Deborah', email: 'DEmerson@DTIS-corp.com', cell: '301-455-7412' },
  { id: 'c019', name: 'Escontrias, Marco', email: 'MEscontrias@DTIS-corp.com', cell: '956-740-1006' },
  { id: 'c020', name: 'Falcone, Christopher', email: 'CFalcone@DTIS-corp.com', cell: '717-798-6201' },
  { id: 'c021', name: 'Fedynich, Craig', email: 'CFedynich@DTIS-corp.com', cell: '816-716-7200' },
  { id: 'c022', name: 'Fedynich, Eleanor', email: 'EFedynich@DTIS-corp.com', cell: '816-447-5530' },
  { id: 'c023', name: 'Gaud, Hector', email: 'HGaud@DTIS-corp.com', cell: '609-746-0577' },
  { id: 'c024', name: 'Guffey, Timothy', email: 'TGuffey@DTIS-corp.com', cell: '828-443-3727' },
  { id: 'c025', name: 'Hafley, Wendell', email: 'WHafley@DTIS-corp.com', cell: '757-735-3904' },
  { id: 'c026', name: 'Hall, Glenn', email: 'GHall@DTIS-corp.com', cell: '315-243-9646' },
  { id: 'c027', name: 'Han, Haemi', email: 'HHan@DTIS-corp.com', cell: '571-213-1777' },
  { id: 'c028', name: 'Kozin, Jason', email: 'JKozin@DTIS-corp.com', cell: '267-454-4387' },
  { id: 'c029', name: 'Liu, Sean', email: 'SLiu@DTIS-corp.com', cell: '443-416-8780' },
  { id: 'c030', name: 'Lo, Pius', email: 'PLo@DTIS-corp.com', cell: '609-705-2383' },
  { id: 'c031', name: 'Longo, Joseph', email: 'JLongo@DTIS-corp.com', cell: '571-379-3782' },
  { id: 'c032', name: 'Macomber, William', email: 'WMacomber@DTIS-corp.com', cell: '609-602-4314' },
  { id: 'c033', name: 'Moss, Hunter', email: 'HMoss@DTIS-corp.com', cell: '203-906-4914' },
  { id: 'c034', name: 'Mueller, Raymond', email: 'RMueller@DTIS-corp.com', cell: '703-375-9496' },
  { id: 'c035', name: 'Mulherin, Tracey', email: 'TMulherin@DTIS-corp.com', cell: '609-513-4293' },
  { id: 'c036', name: 'Murray, Robb', email: 'RMurray@DTIS-corp.com', cell: '202-285-7253' },
  { id: 'c037', name: 'Napier, Felicia', email: 'FNapier@DTIS-corp.com', cell: '609-501-3828' },
  { id: 'c038', name: 'Neri, Christina', email: 'CNeri@DTIS-corp.com', cell: '727-301-9797' },
  { id: 'c039', name: 'Polk, Vince', email: 'VPolk@DTIS-corp.com', cell: '678-464-7170' },
  { id: 'c040', name: 'Poole, Kevin', email: 'KPoole@DTIS-corp.com', cell: '503-922-9371' },
  { id: 'c041', name: 'Popp, Richard', email: 'DPopp@DTIS-corp.com', cell: '703-896-2032' },
  { id: 'c042', name: 'Reed, George Aaron', email: 'AReed@DTIS-corp.com', cell: '609-214-2973' },
  { id: 'c043', name: 'Renauro, Gary', email: 'GRenauro@DTIS-corp.com', cell: '609-313-6444' },
  { id: 'c044', name: 'Richmond, Frederick', email: 'FRichmond@DTIS-corp.com', cell: '630-660-9542' },
  { id: 'c045', name: 'Scarpelli, James', email: 'JScarpelli@DTIS-corp.com', cell: '440-610-7455' },
  { id: 'c046', name: 'Sciolis, Joseph', email: 'JSciolis@DTIS-corp.com', cell: '856-362-7612' },
  { id: 'c047', name: 'Scott, Javon', email: 'JScott@DTIS-corp.com', cell: '609-277-4546' },
  { id: 'c048', name: 'Shardar, Raees', email: 'RShardar@DTIS-corp.com', cell: '609-369-5612' },
  { id: 'c049', name: 'Sharma, Yogesh', email: 'YSharma@DTIS-corp.com', cell: '305-467-4416' },
  { id: 'c050', name: 'Silver, Jung-Mi', email: 'JHan@DTIS-corp.com', cell: '703-389-2760' },
  { id: 'c051', name: 'Singh, Ravinder', email: 'RSingh@DTIS-corp.com', cell: '609-703-8942' },
  { id: 'c052', name: 'Slone, Brian', email: 'BSlone@DTIS-corp.com', cell: '443-831-8027' },
  { id: 'c053', name: 'Sonnenfeld, Peter', email: 'PSonnenfeld@DTIS-corp.com', cell: '240-732-9064' },
  { id: 'c054', name: 'Spence, Bill', email: 'BSpence@DTIS-corp.com', cell: '802-309-3653' },
  { id: 'c055', name: 'Staab, Sarah', email: 'SStaab@DTIS-corp.com', cell: '202-320-4402' },
  { id: 'c056', name: 'Thomas, Jonathan', email: 'JThomas@DTIS-corp.com', cell: '732-300-7425' },
  { id: 'c057', name: 'Tran, Kristopher', email: 'KTran@DTIS-corp.com', cell: '609-233-4825' },
  { id: 'c058', name: 'Vassalotti, Mark', email: 'MVassalotti@DTIS-corp.com', cell: '609-501-7762' },
  { id: 'c059', name: 'VincesRodriguez, Jose', email: 'JVincesRodriguez@DTIS-corp.com', cell: '973-876-2830' },
  { id: 'c060', name: 'Walker, Cynthia', email: 'CWalker@DTIS-corp.com', cell: '301-351-2156' },
  { id: 'c061', name: 'Wallis, Melissa', email: 'MWallis@DTIS-corp.com', cell: '703-568-2552' },
  { id: 'c062', name: 'Welp, Robert', email: 'BWelp@DTIS-corp.com', cell: '405-420-6148' },
  { id: 'c063', name: 'Williams, Ruth Rhonda', email: 'RWilliams@DTIS-corp.com', cell: '240-620-8936' },
  { id: 'c064', name: 'Wong, Jeremy', email: 'JWong@DTIS-corp.com', cell: '609-412-6834' },
  { id: 'c065', name: 'Yacoub, Alena', email: 'AGuseva@DTIS-corp.com', cell: '609-992-4607' },
  { id: 'c066', name: 'Zhang, Jun', email: 'JZhang@DTIS-corp.com', cell: '405-338-8520' },
  { id: 'c067', name: 'IT Help Desk / Matt Bibb', email: 'HelpDesk@DTIS-corp.com', cell: '314-306-5409' }
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeItem[] = [
  { id: 'kb1', topic: 'Start Date', content: 'Monday, December 1st, 2025. Delayed from Nov 3rd due to Government Shutdown.' },
  { id: 'kb2', topic: 'Daily Email', content: 'Good morning,\n\nI will be working on the following today, [Date]:\n• Tasks for the day\n• Any special tasks\n• Meetings\n\nAdd in any additional information.' },
  { id: 'kb3', topic: 'Biweekly Report', content: 'Submitted every other Friday (Pay Day). Requires Major Accomplishments, Work Performed, and Work Planned.' }
];

export const COMPANY_ASSETS = [
  {
    id: 'bg-1',
    title: 'DTIS Blue Pattern',
    type: 'Zoom Background',
    url: 'https://placehold.co/1920x1080/1e3a8a/ffffff?text=DTIS+Blue+Pattern',
    preview: 'https://placehold.co/400x225/1e3a8a/ffffff?text=DTIS+Blue'
  },
  {
    id: 'bg-2',
    title: 'DTIS White Pattern',
    type: 'Zoom Background',
    url: 'https://placehold.co/1920x1080/ffffff/1e3a8a?text=DTIS+White+Pattern',
    preview: 'https://placehold.co/400x225/ffffff/1e3a8a?text=DTIS+White'
  }
];

export const DEFAULT_LAYOUT_ORDER = [
  'quick-notes',
  'daily-notes',
  'salary-calculator',
  'time-calculator',
  'schedule-calendar',
  'performance-log',
  'company-resources',
  'directory',
  'public-resources',
  'documents',
  'zoom-backgrounds',
  'brain'
];

export const INITIAL_DATA: AppData = {
  publicLinks: INITIAL_PUBLIC_LINKS,
  secrets: INITIAL_SECRETS,
  performanceLogs: [],
  dailyNotes: [],
  quickNotes: '',
  directory: INITIAL_DIRECTORY,
  knowledgeBase: INITIAL_KNOWLEDGE_BASE,
  holidays: INITIAL_HOLIDAYS,
  currentNote: '',
  currentTomorrowNote: '',
  lastNoteDate: new Date().toISOString().split('T')[0],
  layoutOrder: DEFAULT_LAYOUT_ORDER
};