export type SectionId = 
  | 'hero' 
  | 'lifecycle' 
  | 'roles' 
  | 'how-it-works' 
  | 'trust';

export type StageId = 'fir' | 'upload' | 'verify' | 'audit' | 'archive';

export interface WorkflowStage {
  id: StageId;
  stepNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  actor: string;
  actorRole: string;
  securityGuarantee: string;
  hashAlgorithm: string;
  color: string;
  glowColor: string;
  actions: string[];
  sampleRecord: {
    id: string;
    title: string;
    timestamp: string;
    actor: string;
    status: string;
    payloadHash: string;
    details: string;
  };
}

export type RoleId = 'police' | 'prosecutor' | 'judge' | 'citizen';

export interface SystemRole {
  id: RoleId;
  title: string;
  subtitle: string;
  badge: string;
  clearanceLevel: string;
  summary: string;
  responsibilities: string[];
  permissions: {
    name: string;
    allowed: boolean;
    reason: string;
  }[];
  activeCasesSummary: {
    total: number;
    pendingAction: string;
    slaScore: string;
  };
}

export interface CaseRecord {
  id: string;
  firNumber: string;
  incidentType: string;
  policeStation: string;
  filingDate: string;
  court: string;
  presidingJudge: string;
  status: 'FIR_REGISTERED' | 'EVIDENCE_SEALED' | 'COURT_VERIFIED' | 'UNDER_TRIAL' | 'DISPOSED_ARCHIVED';
  stage: number;
  hash: string;
  documentsCount: number;
  auditEventsCount: number;
}

export interface TrustPrinciple {
  id: string;
  title: string;
  metric: string;
  unit: string;
  description: string;
  standard: string;
  status: 'VERIFIED' | 'COMPLIANT' | 'CONTINUOUS';
}
