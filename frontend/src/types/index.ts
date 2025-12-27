// Auth Store Types
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
}

// Resume Store Types
export interface AnalysisResult {
  ats_score: number;
  summary: string;
  skills: string[];
  missing_keywords: string[];
  formatting_issues: string[];
  suggestions: string[];
}

export interface OptimizationResult {
  ats_score_before: number;
  ats_score_after: number;
  optimization_summary: string;
  red_vs_green_comparison: ComparisonItem[];
}

export interface ComparisonItem {
  section: string;
  original_text: string;
  optimized_text: string;
  explanation: string;
}

// Build Store Types
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skills {
  Languages: string;
  Frameworks: string;
  Tools: string;
  Databases: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface FormData {
  name: string;
  contact: ContactInfo;
  education: Education[];
  skills: Skills;
  projects: Project[];
}

// History Store Types
export interface ResumeScan {
  _id: string;
  thumbnail?: string;
  score: number;
  originalName: string;
  createdAt: string;
  resumeText?: string;
  analysisResult?: AnalysisResult | OptimizationResult;
}
