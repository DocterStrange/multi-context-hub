export type ContextType = 'individual' | 'organization' | 'helper';

export type OrganizationRole = 'admin' | 'member';

export interface Context {
  id: string;
  type: ContextType;
  name: string;
  credits: number;
  role?: OrganizationRole; // For organization contexts
  helperFor?: string; // For helper contexts - the name of the person you're helping
}

export interface Document {
  id: string;
  fileName: string;
  status: 'processing' | 'completed' | 'failed';
  uploadedDate: Date;
  creditsUsed: number;
  contextId: string;
  contextName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
