import * as THREE from 'three';

export interface DocumentMeta {
  title: string;
  docNumber: string;
  type: string;
  stampText: string;
  stampColor: string;
  hash: string;
  date: string;
}

export const LEGAL_DOCUMENTS: DocumentMeta[] = [
  {
    title: 'FIRST INFORMATION REPORT',
    docNumber: 'FIR-DL-2026-0941',
    type: 'POLICE E-LODGEMENT',
    stampText: 'REGISTERED // SHA-256',
    stampColor: '#10b981',
    hash: 'e3b0c44298fc1c149afbf4c8996fb924',
    date: '2026-08-28 09:14:02 IST',
  },
  {
    title: 'ELECTRONIC EVIDENCE AFFIDAVIT',
    docNumber: 'AFF-SEC-65B-882',
    type: 'FORENSIC EXHIBIT A-12',
    stampText: 'SEC 65B IT ACT ADMISSIBLE',
    stampColor: '#06b6d4',
    hash: '7d5a99f603f231d53e8b7e6d34a65460',
    date: '2026-08-28 10:22:45 IST',
  },
  {
    title: 'JUDICIAL CHARGESHEET',
    docNumber: 'CS-COURT-2026-440',
    type: 'PROSECUTORIAL DOCKET',
    stampText: 'SCRUTINIZED & FILED',
    stampColor: '#f59e0b',
    hash: 'c897a3f1245089df5a02e185c723f991',
    date: '2026-08-28 11:05:18 IST',
  },
  {
    title: 'HIGH COURT OF JUDICATURE',
    docNumber: 'WP(CRL)-1092/2026',
    type: 'JUDICIAL PETITION',
    stampText: 'SEAL OF THE COURT',
    stampColor: '#3b82f6',
    hash: 'a12f9483dc0972b52814bc7580327e5e',
    date: '2026-08-28 11:45:00 IST',
  },
  {
    title: 'AUDIT TRAIL CERTIFICATE',
    docNumber: 'AUDIT-LOG-EVT-9842',
    type: 'SYSTEM AUDIT RECORD',
    stampText: 'APPEND-ONLY VERIFIED',
    stampColor: '#10b981',
    hash: '5e884898da28047151d0e56f8dc62927',
    date: '2026-08-28 12:10:33 IST',
  },
  {
    title: 'DIGITAL FORENSIC SEIZURE MEMO',
    docNumber: 'SZR-CFSL-HASH-009',
    type: 'CHAIN OF CUSTODY EXHIBIT',
    stampText: 'CUSTODIAN SIGNED',
    stampColor: '#8b5cf6',
    hash: '9f86d081884c7d659a2feaa0c55ad015',
    date: '2026-08-28 12:30:19 IST',
  },
  {
    title: 'PERPETUAL ARCHIVAL RECORD',
    docNumber: 'ARC-SEAL-2026-FINAL',
    type: 'PRESERVED CASE DOCKET',
    stampText: 'LOCKED & ARCHIVED',
    stampColor: '#10b981',
    hash: '4b227777d4dd1fc61c6f884f48641d02',
    date: '2026-08-28 13:00:00 IST',
  },
];

/**
 * Generates an ultra-crisp document texture on canvas
 */
export function createDocumentTexture(doc: DocumentMeta, isDarkMode: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 724; // Standard A4 aspect ratio (1 : 1.414)
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Background
  const bgColor = isDarkMode ? '#0F172A' : '#F8FAFC';
  const paperBorder = isDarkMode ? '#1E293B' : '#E2E8F0';
  const textColor = isDarkMode ? '#F1F5F9' : '#0F172A';
  const subTextColor = isDarkMode ? '#94A3B8' : '#64748B';
  const watermarkColor = isDarkMode ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.035)';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border & double hairline margin
  ctx.strokeStyle = paperBorder;
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // Micro-security grid background pattern
  ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';
  ctx.lineWidth = 1;
  for (let y = 30; y < canvas.height - 30; y += 16) {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(canvas.width - 30, y);
    ctx.stroke();
  }

  // Large center watermark
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 5);
  ctx.textAlign = 'center';
  ctx.font = 'bold 54px monospace';
  ctx.fillStyle = watermarkColor;
  ctx.fillText('JUSTICE E-VAULT', 0, 0);
  ctx.font = 'bold 22px monospace';
  ctx.fillText('OFFICIAL DIGITAL RECORD', 0, 35);
  ctx.restore();

  // Header banner
  ctx.fillStyle = isDarkMode ? '#1E293B' : '#EDF2F7';
  ctx.fillRect(25, 25, canvas.width - 50, 46);

  ctx.fillStyle = doc.stampColor;
  ctx.fillRect(25, 25, 8, 46);

  // Judicial emblem placeholder (Scales symbol)
  ctx.fillStyle = doc.stampColor;
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('⚖', 42, 54);

  // Type & Number
  ctx.fillStyle = textColor;
  ctx.font = 'bold 14px monospace';
  ctx.fillText(doc.type, 70, 46);

  ctx.fillStyle = subTextColor;
  ctx.font = '11px monospace';
  ctx.fillText(doc.docNumber, 70, 62);

  // Document Title
  ctx.fillStyle = textColor;
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(doc.title, 35, 105);

  // Metadata row
  ctx.fillStyle = subTextColor;
  ctx.font = '11px monospace';
  ctx.fillText(`ATTESTED: ${doc.date}`, 35, 128);

  // Decorative divider
  ctx.strokeStyle = isDarkMode ? '#334155' : '#CBD5E1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(35, 140);
  ctx.lineTo(canvas.width - 35, 140);
  ctx.stroke();

  // Simulated legal paragraphs (text blocks & redacted security bars)
  const lines = [
    { type: 'text', w: 0.88 },
    { type: 'text', w: 0.94 },
    { type: 'text', w: 0.72 },
    { type: 'gap', w: 0 },
    { type: 'heading', label: 'EVIDENTIARY PARTICULARS' },
    { type: 'text', w: 0.85 },
    { type: 'bar', w: 0.65 }, // Redacted/encrypted line
    { type: 'text', w: 0.92 },
    { type: 'text', w: 0.78 },
    { type: 'gap', w: 0 },
    { type: 'heading', label: 'CRYPTOGRAPHIC ATTESTATION' },
    { type: 'text', w: 0.95 },
    { type: 'bar', w: 0.55 },
    { type: 'text', w: 0.82 },
  ];

  let currentY = 165;
  for (const line of lines) {
    if (line.type === 'gap') {
      currentY += 14;
    } else if (line.type === 'heading') {
      ctx.fillStyle = isDarkMode ? '#38BDF8' : '#0284C7';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(line.label || '', 35, currentY);
      currentY += 16;
    } else if (line.type === 'bar') {
      // Shaded security hash bar
      ctx.fillStyle = isDarkMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.2)';
      ctx.fillRect(35, currentY - 8, (canvas.width - 70) * line.w, 9);
      currentY += 16;
    } else {
      // Simulated printed text line
      ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(35, currentY - 7, (canvas.width - 70) * line.w, 6);
      currentY += 16;
    }
  }

  // QR Code & Barcode Block
  const qrX = 35;
  const qrY = canvas.height - 180;
  ctx.fillStyle = isDarkMode ? '#1E293B' : '#E2E8F0';
  ctx.fillRect(qrX, qrY, 80, 80);

  // Simulated QR pixel grid
  ctx.fillStyle = textColor;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 0 || (r === 0 && c < 3) || (r === 7 && c > 4)) {
        ctx.fillRect(qrX + 8 + c * 8, qrY + 8 + r * 8, 6, 6);
      }
    }
  }

  // Simulated Barcode
  const barX = 135;
  const barY = qrY + 15;
  for (let b = 0; b < 40; b++) {
    const bw = (b % 3 === 0 ? 3 : 1.5);
    ctx.fillStyle = textColor;
    ctx.fillRect(barX + b * 6, barY, bw, 35);
  }
  ctx.fillStyle = subTextColor;
  ctx.font = '10px monospace';
  ctx.fillText(`ID: ${doc.docNumber}`, barX, barY + 50);

  // Bottom Hash Line
  ctx.fillStyle = isDarkMode ? '#10B981' : '#059669';
  ctx.font = '10px monospace';
  ctx.fillText(`SHA-256: ${doc.hash}`, 35, canvas.height - 70);

  // Official Stamp (angled stamp in bottom right)
  ctx.save();
  ctx.translate(canvas.width - 120, canvas.height - 120);
  ctx.rotate(-0.18);

  // Stamp circle
  ctx.strokeStyle = doc.stampColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.stroke();

  // Stamp text
  ctx.fillStyle = doc.stampColor;
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DIGITAL SEAL', 0, -22);
  ctx.font = 'bold 8px monospace';
  ctx.fillText(doc.stampText.split('//')[0]?.trim() || 'SEALED', 0, 4);
  ctx.font = 'bold 8px monospace';
  ctx.fillText('VERIFIED', 0, 24);

  ctx.restore();

  // Create Three.js Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Generates an official judicial security watermark back texture
 */
export function createDocumentBackTexture(isDarkMode: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 724;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Colors
  const bgColor = isDarkMode ? '#0B1320' : '#F1F5F9';
  const borderColor = isDarkMode ? '#1E293B' : '#CBD5E1';
  const patternColor = isDarkMode ? 'rgba(16, 185, 129, 0.06)' : 'rgba(5, 150, 105, 0.05)';
  const textColor = isDarkMode ? '#64748B' : '#94A3B8';
  const emeraldAccent = isDarkMode ? '#10B981' : '#059669';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Security Guilloche / Diagonal Pattern
  ctx.strokeStyle = patternColor;
  ctx.lineWidth = 1.2;
  for (let i = -canvas.height; i < canvas.width * 2; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + canvas.height, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + canvas.height, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  // Central Emblem
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Outer ring
  ctx.strokeStyle = emeraldAccent;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 90, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 78, 0, Math.PI * 2);
  ctx.stroke();

  // Scales of Justice Icon in center
  ctx.fillStyle = emeraldAccent;
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⚖', 0, -10);

  // Text around seal
  ctx.fillStyle = textColor;
  ctx.font = 'bold 11px monospace';
  ctx.fillText('DIGITAL CASE SYSTEM', 0, 42);
  ctx.font = '9px monospace';
  ctx.fillText('IMMUTABLE E-COURT RECORD', 0, 58);

  ctx.restore();

  // Top header
  ctx.fillStyle = textColor;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL DIGITAL ARCHIVE BACKING', canvas.width / 2, 50);

  // Microtext lines
  ctx.font = '8px monospace';
  ctx.fillStyle = isDarkMode ? '#475569' : '#94A3B8';
  ctx.fillText('CERTIFIED UNDER SEC 65B EVIDENCE ACT // RFC-3161 TIMESTAMPED // HASH SEALED', canvas.width / 2, 70);

  // Bottom Warning
  ctx.fillText('CONFIDENTIAL & TAMPER-EVIDENT // CHAIN OF CUSTODY VERIFIED', canvas.width / 2, canvas.height - 55);

  // Barcode at bottom
  const barcodeY = canvas.height - 40;
  const barStart = 116;
  ctx.fillStyle = textColor;
  for (let b = 0; b < 46; b++) {
    const w = (b % 4 === 0 || b % 7 === 0) ? 3 : 1.5;
    ctx.fillRect(barStart + b * 6, barcodeY, w, 22);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}
