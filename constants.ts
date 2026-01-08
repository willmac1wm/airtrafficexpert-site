import { BlogPost, Service, RfpOpportunity, ChartData } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'ATC Consulting',
    description: 'Expert guidance on FAA regulations, airspace redesign, and safety management systems for airports and municipalities.',
    iconName: 'TowerControl',
    link: '/services'
  },
  {
    id: '2',
    title: 'Training Solutions',
    description: 'Custom curriculum development for controller training, leveraging modern simulation technologies and learning management systems.',
    iconName: 'GraduationCap',
    link: '/services'
  },
  {
    id: '3',
    title: 'Expert Witness',
    description: 'Forensic analysis and expert testimony for aviation incidents, providing objective and authoritative insights.',
    iconName: 'Gavel',
    link: '/services'
  },
  {
    id: '4',
    title: 'NextGen Tech',
    description: 'Implementation support for NextGen technologies, including ADS-B, Data Comm, and Remote Tower Systems.',
    iconName: 'Cpu',
    link: '/services'
  },
  {
    id: '5',
    title: 'Industry News',
    description: 'Stay updated with the latest developments in aviation policy, technology breakthroughs, and sector analysis.',
    iconName: 'Newspaper',
    link: '/news'
  },
  {
    id: '6',
    title: 'Aviation Podcast',
    description: 'Listen to deep dives into air traffic control stories, interviews with industry veterans, and career advice.',
    iconName: 'Mic',
    link: '/podcast'
  },
  {
    id: '7',
    title: 'YouTube Channel',
    description: 'Watch visual breakdowns of complex airspace scenarios, training tutorials, and simulator walkthroughs.',
    iconName: 'Youtube',
    link: '/youtube'
  },
  {
    id: '8',
    title: 'OpenSTARS Simulator',
    description: 'Experience realistic air traffic control with our browser-based radar simulator. Guide aircraft using authentic FAA phraseology.',
    iconName: 'Radar',
    link: '/simulation'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Remote Tower Operations',
    excerpt: 'Exploring how remote tower technology is reshaping air traffic management for regional airports, reducing costs while maintaining safety standards.',
    date: 'Oct 12, 2023',
    category: 'Technology',
    imageUrl: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    title: 'Navigating FAA Regulatory Changes in 2024',
    excerpt: 'A comprehensive guide to the upcoming changes in FAA regulations affecting commercial drone operations and airspace integration.',
    date: 'Sep 28, 2023',
    category: 'Regulations',
    imageUrl: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '3',
    title: 'Human Factors in Air Traffic Control',
    excerpt: 'Analyzing the critical role of human factors engineering in reducing controller fatigue and improving situational awareness.',
    date: 'Sep 15, 2023',
    category: 'Safety',
    imageUrl: 'https://picsum.photos/800/600?random=3',
  },
];

export const MOCK_RFPS: RfpOpportunity[] = [
  {
    id: '1',
    agency: 'FAA',
    title: 'NextGen Training Support Services',
    solicitationNumber: '693KA8-23-R-00001',
    postedDate: '2023-10-01',
    deadline: '2023-11-15',
    value: 2500000,
    matchScore: 95,
    status: 'Open',
  },
  {
    id: '2',
    agency: 'DOD',
    title: 'Airspace Simulation Systems',
    solicitationNumber: 'HQ0034-23-R-0123',
    postedDate: '2023-09-25',
    deadline: '2023-10-30',
    value: 1200000,
    matchScore: 88,
    status: 'Submitted',
  },
  {
    id: '3',
    agency: 'NASA',
    title: 'UAM Traffic Management Research',
    solicitationNumber: '80ARC023R0010',
    postedDate: '2023-10-05',
    deadline: '2023-11-20',
    value: 850000,
    matchScore: 92,
    status: 'Open',
  },
  {
    id: '4',
    agency: 'DOT',
    title: 'Aviation Safety Data Analysis',
    solicitationNumber: '6913G6-23-R-2001',
    postedDate: '2023-09-10',
    deadline: '2023-10-15',
    value: 450000,
    matchScore: 75,
    status: 'Lost',
  },
];

export const ANALYTICS_DATA: ChartData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];
