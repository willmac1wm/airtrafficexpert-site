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
    content: `Remote tower technology represents one of the most significant innovations in air traffic control since the introduction of radar. By leveraging high-definition cameras, advanced sensors, and secure data links, controllers can now manage airport traffic from centralized facilities miles away from the runways they oversee.

## The Technology Behind Remote Towers

Modern remote tower systems utilize an array of pan-tilt-zoom cameras that provide 360-degree coverage of the airport environment. These feeds are stitched together to create a seamless panoramic view that controllers interact with on large displays. Advanced signal processing ensures minimal latency, while redundant communication systems maintain safety margins.

## Benefits for Regional Airports

For smaller regional airports that struggle to maintain 24/7 tower operations, remote towers offer a cost-effective solution. Multiple airports can be managed from a single facility, reducing staffing requirements while actually extending operational hours. The FAA has already approved several remote tower implementations in the United States, with more expected in the coming years.

## Challenges and Considerations

Despite the promise, remote tower adoption faces challenges including regulatory approval timelines, controller acceptance, and cybersecurity concerns. The human factors aspect—ensuring controllers maintain situational awareness without physical presence—remains an active area of research.

The future of remote towers looks bright, with major aviation authorities worldwide investing in this technology as a key component of modernized air traffic management infrastructure.`,
    date: 'Jan 8, 2026',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&auto=format&q=80',
  },
  {
    id: '2',
    title: 'Navigating FAA Regulatory Changes in 2026',
    excerpt: 'A comprehensive guide to the upcoming changes in FAA regulations affecting commercial drone operations and airspace integration.',
    content: `The FAA continues to evolve its regulatory framework to accommodate the rapid growth of unmanned aircraft systems (UAS) while maintaining the safety standards that define American aviation.

## Key Regulatory Updates

The latest regulatory updates focus on three main areas: Beyond Visual Line of Sight (BVLOS) operations, Remote ID implementation, and Urban Air Mobility (UAM) integration. Each of these areas represents significant opportunities for commercial operators who understand the compliance requirements.

## BVLOS Operations

Extended BVLOS waivers are becoming more accessible for operators who can demonstrate robust detect-and-avoid capabilities. The FAA has published updated guidance on acceptable means of compliance, including both cooperative and non-cooperative detection systems.

## Remote ID Compliance

All UAS operators must now comply with Remote ID requirements. This includes either broadcast Remote ID from the aircraft itself or operating within FAA-Recognized Identification Areas (FRIAs). Understanding these requirements is essential for commercial operators.

## Preparing Your Organization

Organizations should conduct a thorough gap analysis between current operations and new requirements. This includes reviewing pilot certifications, operational procedures, and technical compliance of aircraft systems. Engaging with FAA-designated representatives early can smooth the approval process.

The regulatory landscape will continue evolving as technology advances. Staying informed and maintaining proactive compliance programs will position operators for success.`,
    date: 'Jan 5, 2026',
    category: 'Regulations',
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop&auto=format&q=80',
  },
  {
    id: '3',
    title: 'Human Factors in Air Traffic Control',
    excerpt: 'Analyzing the critical role of human factors engineering in reducing controller fatigue and improving situational awareness.',
    content: `Human factors engineering sits at the heart of air traffic control safety. Despite advances in automation, human controllers remain the critical decision-makers in our airspace system, making their cognitive performance paramount to aviation safety.

## Understanding Controller Workload

Workload in ATC isn't simply about the number of aircraft being controlled. It's a complex interaction of traffic complexity, weather conditions, coordination requirements, and the cognitive demands of maintaining a mental picture of the airspace. Research has identified optimal workload ranges where controllers perform best—neither bored by too little activity nor overwhelmed by too much.

## Fatigue Management

The FAA has implemented fatigue risk management systems (FRMS) recognizing that controller fatigue poses significant safety risks. This includes mandatory rest periods, limits on consecutive shifts, and education programs. Facilities are increasingly using fatigue prediction tools to optimize scheduling.

## Technology as a Partner

Modern ATC systems are designed with human factors principles embedded. Color coding, alert prioritization, and display organization all reflect decades of research into how controllers process information. The goal is technology that enhances rather than replaces human judgment.

## The Path Forward

Future ATC systems will likely incorporate more AI-assisted decision making, but always with the human controller maintaining authority. Understanding how to design these human-machine partnerships effectively is one of the most important challenges facing aviation today.

Investing in human factors research and implementation isn't just good practice—it's essential for maintaining the safest airspace in the world.`,
    date: 'Dec 28, 2025',
    category: 'Safety',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format&q=80',
  },
  {
    id: '4',
    title: 'Understanding STARS: The Backbone of Terminal Radar',
    excerpt: 'A deep dive into the Standard Terminal Automation Replacement System and how it revolutionized approach control operations.',
    content: `The Standard Terminal Automation Replacement System (STARS) represents the FAA's primary terminal radar display system, providing controllers with the tools they need to safely sequence and separate aircraft in some of the busiest airspace in the world.

## What is STARS?

STARS is an integrated automation system that provides air traffic controllers with aircraft tracking, flight data processing, and weather information. Deployed at terminal radar approach control (TRACON) facilities and airport towers nationwide, it replaced the aging ARTS systems that had served since the 1970s.

## Key Capabilities

The system processes primary and secondary radar returns, ADS-B data, and flight plan information to present controllers with a comprehensive traffic picture. Features include conflict alert, minimum safe altitude warning, and automated handoff capabilities that enhance safety while reducing controller workload.

## The Controller Interface

Controllers interact with STARS through trackballs and keyboards, entering commands to manage aircraft data blocks, initiate handoffs, and access system functions. The display is highly customizable, allowing controllers to optimize their workspace for specific operational needs.

## Continuous Evolution

STARS continues to evolve with regular software updates adding new capabilities. Recent enhancements have focused on integrating space-based ADS-B data and improving fusion of multiple surveillance sources.

Understanding STARS is essential for anyone working in or around terminal ATC operations.`,
    date: 'Dec 20, 2025',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop&auto=format&q=80',
  },
  {
    id: '5',
    title: 'Becoming an Air Traffic Controller: Career Guide',
    excerpt: 'Everything you need to know about starting a career in air traffic control, from education to FAA Academy and beyond.',
    content: `A career in air traffic control offers excellent compensation, job security, and the satisfaction of playing a critical role in aviation safety. Here's what you need to know about entering this demanding but rewarding profession.

## Basic Requirements

To become an FAA air traffic controller, you must be a U.S. citizen, be under 31 years old at appointment, pass medical and security evaluations, and successfully complete the FAA Academy training program. Prior experience in aviation or military ATC can provide advantages but isn't required.

## Education Pathways

The FAA accepts candidates through several pathways. The Collegiate Training Initiative (CTI) program partners with accredited schools offering ATC curricula. Veterans with military ATC experience receive preferential hiring. Off-the-street hiring announcements, though less frequent, are open to anyone meeting basic qualifications.

## The FAA Academy

All new controllers attend the FAA Academy in Oklahoma City for initial training lasting 2-5 months depending on the track. This rigorous program combines classroom instruction with simulation exercises. Approximately 10-20% of students don't complete the program.

## Facility Training

After the Academy, controllers are assigned to facilities where they complete on-the-job training. This can take 1-3 years depending on facility complexity. Certification on each position requires demonstrating competency to certified controllers.

## Compensation and Benefits

Controllers earn competitive salaries with locality pay adjustments. Benefits include retirement plans, health insurance, and paid leave. Senior controllers at busy facilities can earn over $150,000 annually.

The path is challenging but achievable for dedicated individuals interested in aviation careers.`,
    date: 'Dec 15, 2025',
    category: 'Career',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format&q=80',
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
