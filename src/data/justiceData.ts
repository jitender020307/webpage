import { WorkflowStage, SystemRole, CaseRecord, TrustPrinciple } from '../types';

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'fir',
    stepNumber: 1,
    title: 'Register FIR',
    subtitle: 'Digitally Attested First Information Report',
    badge: 'STAGE 01',
    description: 'Instant police FIR lodgement with tamper-evident digital timestamps, GPS geofencing, and immediate cryptographic fingerprinting on submission.',
    actor: 'Duty Officer / Sub-Inspector',
    actorRole: 'Police Department',
    securityGuarantee: 'Zero-backdating via distributed atomic clock consensus',
    hashAlgorithm: 'SHA-256 with RFC 3161 Timestamp Token',
    color: '#10b981', // Emerald
    glowColor: 'rgba(16, 185, 129, 0.4)',
    actions: [
      'Record complainant statement with biometric/OTP verification',
      'Select relevant legal sections (IPC / BNS / Special Acts)',
      'Generate cryptographically signed e-FIR PDF',
      'Distribute immutable copy to Magistrate within 24 hours'
    ],
    sampleRecord: {
      id: 'FIR-2026-DL-0982',
      title: 'Commercial Cyber Extortion & Tampering',
      timestamp: '2026-08-28 09:14:22 UTC',
      actor: 'Insp. Vikram Rathore (Badge #7842)',
      status: 'AUTHENTICATED & SEALED',
      payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      details: 'First Information Report logged via e-Police Terminal. Geotag verified at Cyber Crime Cell, New Delhi.'
    }
  },
  {
    id: 'upload',
    stepNumber: 2,
    title: 'Upload Documents',
    subtitle: 'Cryptographic Evidence & Chargesheet Sealing',
    badge: 'STAGE 02',
    description: 'Investigating officers attach forensic reports, seizure memos, witness depositions, and CCTV transcripts. Each payload receives an immediate hash lock.',
    actor: 'Forensic Lab & Investigating Team',
    actorRole: 'Evidence Custodian',
    securityGuarantee: 'Bit-for-bit integrity validation & write-once preservation',
    hashAlgorithm: 'SHA-256 + Ed25519 Custodian Signature',
    color: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    actions: [
      'Bulk ingest audio, video, CCTV dumps, and PDF statements',
      'Automated hash calculation on client before byte transmission',
      'Instant tamper detection if even 1 byte is altered',
      'Custodian digital signature with non-repudiation'
    ],
    sampleRecord: {
      id: 'EVD-982-DOC-04',
      title: 'Digital Forensic Hard Drive Hex Mirror & Log Dumps',
      timestamp: '2026-08-28 11:32:05 UTC',
      actor: 'Dr. Aris Thorne (CFSL Examiner)',
      status: 'TAMPER_SEALED',
      payloadHash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      details: 'Forensic clone image SHA-256 verified against physical drive write-blocker output.'
    }
  },
  {
    id: 'verify',
    stepNumber: 3,
    title: 'Verify & Process',
    subtitle: 'Prosecutorial Review & Courtroom Discovery',
    badge: 'STAGE 03',
    description: 'Public prosecutors examine charge sheets, defense attorneys access authorized discovery files, and Magistrates schedule hearings with transparent audit logs.',
    actor: 'Magistrate / Public Prosecutor',
    actorRole: 'Judicial Authority',
    securityGuarantee: 'Granular Role-Based Access Control (RBAC) & watermarking',
    hashAlgorithm: 'Asymmetric Public-Key Verification',
    color: '#3b82f6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
    actions: [
      'Prosecutor scrutiny of prima facie evidence',
      'Issuance of digital summons and bail hearing schedules',
      'Defense council discovery access with dynamic anti-leak watermarking',
      'Judicial bench recording of witness testimony with digital docket sync'
    ],
    sampleRecord: {
      id: 'CRT-2026-BENCH-12',
      title: 'Cognizance Taken & Trial Hearing Fixed',
      timestamp: '2026-08-28 14:05:19 UTC',
      actor: 'Hon. Justice Sarah Vance (District Court 4)',
      status: 'JUDICIALLY_COGNIZED',
      payloadHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      details: 'Charges framed under Section 420 & 66D. Next hearing: 15 Sept 2026.'
    }
  },
  {
    id: 'audit',
    stepNumber: 4,
    title: 'Audit Trail',
    subtitle: 'Immutable Chain of Custody Ledger',
    badge: 'STAGE 04',
    description: 'Every file view, download, permission query, or status transition is permanently written into an append-only, tamper-proof cryptographic audit log.',
    actor: 'Autonomous Consensus Engine',
    actorRole: 'System Monitor',
    securityGuarantee: 'Merkle Tree anchored ledger preventing history tampering',
    hashAlgorithm: 'Merkle Root SHA-256 with Zero-Knowledge Proofs',
    color: '#8b5cf6', // Violet
    glowColor: 'rgba(139, 92, 246, 0.4)',
    actions: [
      'Live audit stream for Supreme Court & vigilance inspections',
      'Automatic flagging of unauthorized access attempts',
      'Cryptographic chain linking previous event hash to current event',
      'Exportable court-admissible certificate of compliance'
    ],
    sampleRecord: {
      id: 'AUDIT-BLK-88219',
      title: 'Chain of Custody Ledger Block #88219',
      timestamp: '2026-08-28 15:40:01 UTC',
      actor: 'System Integrity Engine v4.2',
      status: 'LEDGER_VERIFIED',
      payloadHash: '1a52e77b6bb81ef5159f81d116c905cb9b57ee4587c69992f9d84e8a1d7c934f',
      details: 'Block containing 42 judicial custody events validated with 0 discrepancies.'
    }
  },
  {
    id: 'archive',
    stepNumber: 5,
    title: 'Archive & Secure',
    subtitle: 'Final Court Order Sealing & Permanent Vault',
    badge: 'STAGE 05',
    description: 'Upon final judgement, the complete case docket is encrypted, cold-archived across distributed high-security nodes, and made search-verifiable for appeals.',
    actor: 'Registrar General / Chief Archivist',
    actorRole: 'National Judiciary Vault',
    securityGuarantee: 'Quantum-resistant encryption & 50-year verifiable storage',
    hashAlgorithm: 'AES-256-GCM + Post-Quantum Dilithium Envelope',
    color: '#f59e0b', // Amber
    glowColor: 'rgba(245, 158, 11, 0.4)',
    actions: [
      'Final judgement digitally signed with PKI hardware token',
      'Encasement into archival ISO/IEC 14721 OAIS digital docket',
      'Public verification hash generated for certified copy authentication',
      'Reversible only by Supreme Court writ of certiorari'
    ],
    sampleRecord: {
      id: 'ARCH-2026-ORDR-009',
      title: 'Final Judicial Disposition & Permanent Vault Seal',
      timestamp: '2026-08-28 17:15:30 UTC',
      actor: 'Registrar (Judicial), High Court of Justice',
      status: 'PERMANENTLY_SEALED',
      payloadHash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
      details: 'Conviction order signed, docket hash certified and locked into long-term archive repository.'
    }
  }
];

export const SYSTEM_ROLES: SystemRole[] = [
  {
    id: 'police',
    title: 'Police & Investigating Officers',
    subtitle: 'Frontline Case Ingestion & Field Evidence',
    badge: 'LAW ENFORCEMENT',
    clearanceLevel: 'LEVEL 2 — LAW_ENF_STD',
    summary: 'Registers digitally attested FIRs, generates crime scene dockets, attaches forensic exhibits, and transfers custody to the judicial magistrate.',
    responsibilities: [
      'Lodge verified e-FIR with geo-coordinates and biometric complainant signature',
      'Upload seized electronic and physical evidence with hash calculation',
      'Prepare and submit charge sheet within statutory deadlines (60/90 days)',
      'Receive courtroom summons and execution notices in real time'
    ],
    permissions: [
      { name: 'Register New Case / FIR', allowed: true, reason: 'Core statutory power' },
      { name: 'Upload & Seal Evidence', allowed: true, reason: 'Field investigation necessity' },
      { name: 'Alter Post-Filing Evidence', allowed: false, reason: 'Cryptographically blocked to prevent tampering' },
      { name: 'Issue Final Court Judgements', allowed: false, reason: 'Exclusive judicial prerogative' }
    ],
    activeCasesSummary: {
      total: 1420,
      pendingAction: '14 charge sheets due within 72h',
      slaScore: '98.4%'
    }
  },
  {
    id: 'prosecutor',
    title: 'Prosecutors & Legal Counsel',
    subtitle: 'State Representation & Evidence Scrutiny',
    badge: 'PROSECUTION / DEFENSE',
    clearanceLevel: 'LEVEL 3 — LEGAL_COUNSEL',
    summary: 'Reviews case dockets, verifies forensic chain of custody, submits arguments, and accesses defense discovery under protective watermarks.',
    responsibilities: [
      'Scrutinize charge sheets before courtroom submission',
      'Verify digital integrity of prosecution exhibits against police hashes',
      'Access legal precedence and automated timeline analytics',
      'Serve and receive defense applications through the encrypted judicial channel'
    ],
    permissions: [
      { name: 'View Verified Case Dockets', allowed: true, reason: 'Courtroom preparation' },
      { name: 'Request Forensic Re-verification', allowed: true, reason: 'Evidence validation' },
      { name: 'Delete / Redact Court Records', allowed: false, reason: 'Strict non-repudiation constraint' },
      { name: 'Modify FIR Incident Data', allowed: false, reason: 'Only police can report, only judges can rule' }
    ],
    activeCasesSummary: {
      total: 864,
      pendingAction: '28 bail responses pending hearing',
      slaScore: '99.1%'
    }
  },
  {
    id: 'judge',
    title: 'Judges & Court Magistrates',
    subtitle: 'Adjudication, Trial Oversight & Final Orders',
    badge: 'JUDICIAL BENCH',
    clearanceLevel: 'LEVEL 4 — JUDICIAL_SUPREME',
    summary: 'Exercises supervisory control over the case docket, takes cognizance, conducts video hearings, records depositions, and signs binding court orders.',
    responsibilities: [
      'Take formal cognizance of charges and issue judicial warrants',
      'Review real-time tampering alerts across all submitted case materials',
      'Digitally sign interim injunctions, bail grants, and final judgements',
      'Order immutable case sealing into the National Judiciary Vault'
    ],
    permissions: [
      { name: 'Issue Binding Judgements', allowed: true, reason: 'Constitutional judicial authority' },
      { name: 'Order Witness Protection Redactions', allowed: true, reason: 'Magisterial order power' },
      { name: 'Override Immutable Ledger Logs', allowed: false, reason: 'Mathematical consensus prevents any arbitrary deletion' },
      { name: 'Conduct Sealed In-Camera Hearings', allowed: true, reason: 'Sensitive case protocol' }
    ],
    activeCasesSummary: {
      total: 412,
      pendingAction: '9 final orders scheduled for digital signing',
      slaScore: '99.8%'
    }
  },
  {
    id: 'citizen',
    title: 'Citizens & Petitioners',
    subtitle: 'Transparent Tracking, Status & Certified Copies',
    badge: 'PUBLIC TRANSPARENCY',
    clearanceLevel: 'LEVEL 1 — CITIZEN_ACCESS',
    summary: 'Empowers complainants, victims, and defendants to monitor their case trajectory in real time, receive hearing reminders, and download certified copies.',
    responsibilities: [
      'Track real-time stage of FIR from investigation to trial',
      'Verify authenticity of any court document using QR/hash verification',
      'Receive instant SMS/Email notifications for hearing postponements or orders',
      'Apply for authenticated digital copies without physical court visits'
    ],
    permissions: [
      { name: 'Check Real-Time Case Stage', allowed: true, reason: 'Right to information and speedy trial' },
      { name: 'Download QR-Certified Orders', allowed: true, reason: 'Public record transparency' },
      { name: 'View Unredacted Sensitive Forensic Dumps', allowed: false, reason: 'Restricted under Evidence Act & Privacy Law' },
      { name: 'File Online Supplementary Grievance', allowed: true, reason: 'Citizen empowerment portal' }
    ],
    activeCasesSummary: {
      total: 12940,
      pendingAction: 'Instant real-time portal tracking active',
      slaScore: '100%'
    }
  }
];

export const TRUST_PRINCIPLES: TrustPrinciple[] = [
  {
    id: 'zero-tamper',
    title: 'Zero-Tamper Guarantee',
    metric: '100%',
    unit: 'Cryptographically Sealed',
    description: 'Every piece of documentary evidence is locked with SHA-256 hashing at ingestion. A single modified bit invalidates the hash signature instantly.',
    standard: 'RFC 3161 / FIPS 180-4',
    status: 'VERIFIED'
  },
  {
    id: 'audit-consensus',
    title: 'Immutable Chain of Custody',
    metric: '0',
    unit: 'Undetected Alterations',
    description: 'Every interaction — from an officer opening an exhibit to a lawyer downloading evidence — is permanently sealed into an append-only distributed ledger.',
    standard: 'ISO/IEC 27037:2012 (Digital Evidence)',
    status: 'COMPLIANT'
  },
  {
    id: 'latency',
    title: 'Courtroom Verification Latency',
    metric: '< 1.2s',
    unit: 'Real-Time Authentication',
    description: 'Judges and prosecutors verify certified copies or forensic integrity in under two seconds directly inside the courtroom.',
    standard: 'Sub-second PKI Validation',
    status: 'CONTINUOUS'
  },
  {
    id: 'paperless',
    title: 'Docket Reduction & Speed',
    metric: '94%',
    unit: 'Paperwork Elimination',
    description: 'Drastic reduction in physical case transit delays between police stations, forensic laboratories, public prosecutor desks, and judicial courtrooms.',
    standard: 'National e-Courts Mission Mode Phase III',
    status: 'VERIFIED'
  }
];

export const RECENT_CASES: CaseRecord[] = [
  {
    id: 'CASE-2026-081',
    firNumber: 'FIR-DL-CYBER-8120',
    incidentType: 'Corporate Fraud & Tampering',
    policeStation: 'Cyber Crime Police Station, North',
    filingDate: '2026-08-14',
    court: 'Court of Chief Judicial Magistrate',
    presidingJudge: 'Hon. Justice P. Sengupta',
    status: 'COURT_VERIFIED',
    stage: 3,
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    documentsCount: 24,
    auditEventsCount: 112
  },
  {
    id: 'CASE-2026-082',
    firNumber: 'FIR-MH-COMM-4419',
    incidentType: 'Intellectual Property Breach',
    policeStation: 'Commercial Crime Division, Mumbai',
    filingDate: '2026-08-20',
    court: 'Commercial Court Bench 2',
    presidingJudge: 'Hon. Justice Ananya Deshmukh',
    status: 'EVIDENCE_SEALED',
    stage: 2,
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    documentsCount: 46,
    auditEventsCount: 88
  },
  {
    id: 'CASE-2026-083',
    firNumber: 'FIR-KA-SPL-1022',
    incidentType: 'Critical Infrastructure Cyber Attack',
    policeStation: 'State Cyber Intelligence Unit, Bengaluru',
    filingDate: '2026-08-02',
    court: 'Special Sessions Judge for Cyber Offenses',
    presidingJudge: 'Hon. Justice R. Narayanan',
    status: 'UNDER_TRIAL',
    stage: 4,
    hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    documentsCount: 92,
    auditEventsCount: 340
  },
  {
    id: 'CASE-2026-084',
    firNumber: 'FIR-DL-SEC-3101',
    incidentType: 'Securities Manipulation & Forgery',
    policeStation: 'Economic Offenses Wing, Delhi',
    filingDate: '2026-07-11',
    court: 'High Court Commercial Appellate Bench',
    presidingJudge: 'Hon. Justice Meera Nair',
    status: 'DISPOSED_ARCHIVED',
    stage: 5,
    hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    documentsCount: 135,
    auditEventsCount: 520
  }
];
