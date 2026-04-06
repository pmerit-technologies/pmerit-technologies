/**
 * OI-350: Self-Assessed Gate Checklist
 * Human-readable gate descriptions for standalone governance.
 * Director checks gates manually — no backend evaluation.
 */

export interface GateDefinition {
  id: string;
  name: string;
  description: string;
  phase: string;
  blocking: boolean;
}

/**
 * AIXORD Baseline gates — simplified for standalone use.
 * 17 core gates that apply to any project type.
 */
export const STANDALONE_GATES: GateDefinition[] = [
  // Setup
  { id: 'GA:LIC', name: 'License', description: 'Project license or terms confirmed', phase: 'SETUP', blocking: true },
  { id: 'GA:DIS', name: 'Disclaimer', description: 'Governance disclaimers acknowledged', phase: 'SETUP', blocking: true },
  { id: 'GA:OBJ', name: 'Objective', description: 'Project objective clearly defined (1-2 sentences)', phase: 'DISCOVER', blocking: true },

  // Discovery
  { id: 'GA:CIT', name: 'Citation Mode', description: 'How AI outputs are cited (strict/standard/minimal)', phase: 'DISCOVER', blocking: false },
  { id: 'GA:CON', name: 'Continuity', description: 'Session continuity strategy defined', phase: 'DISCOVER', blocking: false },

  // Planning
  { id: 'GA:RA', name: 'Reality', description: 'Project classified as Greenfield or Brownfield', phase: 'PLAN', blocking: true },
  { id: 'GA:ENV', name: 'Environment', description: 'Workspace or development environment confirmed', phase: 'PLAN', blocking: true },
  { id: 'GA:PD', name: 'Project Doc', description: 'Project documentation artifact created', phase: 'PLAN', blocking: true },

  // Blueprint
  { id: 'GA:BP', name: 'Blueprint', description: 'Scopes and deliverables defined with acceptance criteria', phase: 'BLUEPRINT', blocking: true },
  { id: 'GA:FX', name: 'Formula', description: 'Execution formula bound to blueprint', phase: 'BLUEPRINT', blocking: true },
  { id: 'GA:IVL', name: 'Integrity', description: 'Blueprint integrity validation passed (no gaps, no circular deps)', phase: 'BLUEPRINT', blocking: true },

  // Execution
  { id: 'GS:DC', name: 'Data Classification', description: 'Data sensitivity level declared (PII, PHI, financial, etc.)', phase: 'EXECUTE', blocking: true },
  { id: 'GA:DOD', name: 'Definition of Done', description: 'All deliverables have clear acceptance criteria', phase: 'EXECUTE', blocking: true },

  // Review
  { id: 'GA:HO', name: 'Handoff', description: 'Session continuity snapshot saved', phase: 'REVIEW', blocking: true },
  { id: 'GA:VA', name: 'Visual Audit', description: 'Visual/functional verification completed', phase: 'REVIEW', blocking: false },
  { id: 'GA:MS', name: 'Master Scope', description: 'Final scope approved by Director', phase: 'LOCK', blocking: true },

  // Audit
  { id: 'GA:AUD', name: 'Audit', description: 'Cross-model audit completed and findings triaged', phase: 'AUDIT', blocking: true },
];

/**
 * Group gates by phase for UI display
 */
export function getGatesByPhase(): Record<string, GateDefinition[]> {
  const grouped: Record<string, GateDefinition[]> = {};
  for (const gate of STANDALONE_GATES) {
    if (!grouped[gate.phase]) grouped[gate.phase] = [];
    grouped[gate.phase].push(gate);
  }
  return grouped;
}
