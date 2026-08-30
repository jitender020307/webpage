export type SectionId =
  | 'hero'
  | 'product'
  | 'lifecycle'
  | 'security'
  | 'pipeline'
  | 'differentiator'
  | 'roles'
  | 'intelligence'
  | 'trust'
  | 'sih-alignment'
  | 'cta';

export type StageId =
  | 'case_registration'
  | 'document_ingestion'
  | 'verification'
  | 'controlled_access'
  | 'review_collaboration'
  | 'audit'
  | 'evidence_traceability'
  | 'archive';

export interface WorkflowStage {
  id: StageId;
  stepNumber: number;
  stageCode: string;
  title: string;
  shortSummary: string;
  description: string;
  primaryActor: string;
  actorRole: string;
  securityMechanism: string;
  integrityAssurance: string;
  color: string;
  badge: string;
  keyOutputs: string[];
  sampleDocket: {
    docketNumber: string;
    documentType: string;
    timestamp: string;
    officer: string;
    status: string;
    sha256Hash: string;
    description: string;
  };
}

export type RoleId =
  | 'investigating_officer'
  | 'forensic_analyst'
  | 'legal_officer'
  | 'reviewer'
  | 'auditor'
  | 'administrator';

export interface SystemRole {
  id: RoleId;
  title: string;
  subtitle: string;
  badge: string;
  clearanceLevel: string;
  overview: string;
  primaryResponsibilities: string[];
  accessPermissions: {
    action: string;
    granted: boolean;
    statutoryRationale: string;
  }[];
  operationalScope: string;
}

export interface SecurityPillar {
  id: string;
  title: string;
  tag: string;
  summary: string;
  technicalMechanism: string;
  evidentiaryValue: string;
  iconName: string;
}

export interface DifferentiatorComparison {
  dimension: string;
  traditionalDms: string;
  secureInvestigationDms: string;
  legalImpact: string;
}

export interface IntelligentFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  practicalApplication: string;
  badge: string;
}

export interface TrustPrinciple {
  id: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  statutoryStandard: string;
  status: 'IMPLEMENTED' | 'STANDARDIZED' | 'CONTINUOUS';
}

export interface SihChallengeMapping {
  requirementId: string;
  challengeTitle: string;
  sihRequirement: string;
  platformSolution: string;
  implementationNote: string;
}
