export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface RfpOpportunity {
  id: string;
  agency: string;
  title: string;
  solicitationNumber: string;
  postedDate: string;
  deadline: string;
  value: number;
  matchScore: number;
  status: string;
}

export interface ChartData {
  name: string;
  value: number;
}
