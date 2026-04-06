/**
 * OI-348: Universal Prompt Templates
 * Phase-specific prompts that work with any AI tool.
 * Copy-to-clipboard with one click.
 */

export interface PromptTemplate {
  phase: string;
  title: string;
  prompt: string;
  variables: string[];
}

export const PHASE_PROMPTS: PromptTemplate[] = [
  {
    phase: 'DISCOVER',
    title: 'Initial Discovery',
    prompt: `You are helping me discover and understand my project.

Project: [PROJECT_NAME]
Objective: [OBJECTIVE]

Please help me:
1. Identify the core problem this project solves
2. Map the key stakeholders and their needs
3. List assumptions that need validation
4. Identify risks and constraints
5. Suggest 3-5 questions I should answer before moving to brainstorming`,
    variables: ['PROJECT_NAME', 'OBJECTIVE'],
  },
  {
    phase: 'BRAINSTORM',
    title: 'Structured Brainstorm',
    prompt: `You are helping me brainstorm options for my project.

Project: [PROJECT_NAME]
Objective: [OBJECTIVE]
Discovery insights: [DISCOVERY_NOTES]

Generate 3-5 distinct approaches. For each approach:
- Name and one-line summary
- Key advantages
- Key risks or trade-offs
- Estimated complexity (Simple / Medium / Complex)
- Kill condition — what would make this approach fail?

Present as a structured comparison table.`,
    variables: ['PROJECT_NAME', 'OBJECTIVE', 'DISCOVERY_NOTES'],
  },
  {
    phase: 'PLAN',
    title: 'Project Planning',
    prompt: `You are helping me plan the execution of my project.

Project: [PROJECT_NAME]
Chosen approach: [APPROACH]
Constraints: [CONSTRAINTS]

Create a structured plan with:
1. Scopes — major work areas (3-7 scopes)
2. Deliverables per scope — what will be produced
3. Dependencies between deliverables
4. Definition of Done for each deliverable
5. Suggested execution order

Format as markdown tables.`,
    variables: ['PROJECT_NAME', 'APPROACH', 'CONSTRAINTS'],
  },
  {
    phase: 'BLUEPRINT',
    title: 'Blueprint Specification',
    prompt: `You are helping me create a detailed blueprint for my project.

Project: [PROJECT_NAME]
Scopes: [SCOPES]
Deliverables: [DELIVERABLES]

For each deliverable, specify:
- Acceptance criteria (what makes it DONE)
- Evidence required (how to verify completion)
- Quality bar (minimum standard)
- Dependencies (what must be done first)

Also validate:
- Are all scopes covered by at least one deliverable?
- Are there circular dependencies?
- Is the scope boundary clear for each item?`,
    variables: ['PROJECT_NAME', 'SCOPES', 'DELIVERABLES'],
  },
  {
    phase: 'EXECUTE',
    title: 'Execution Task',
    prompt: `You are executing a specific deliverable for my project.

Project: [PROJECT_NAME]
Deliverable: [DELIVERABLE_NAME]
Description: [DESCRIPTION]
Definition of Done: [DOD]
Conserved areas (DO NOT modify): [CONSERVED]

Rules:
- Read existing code before making changes
- Cite file paths for every claim
- Do not fabricate — if unsure, state it as an assumption
- Match existing code style and patterns`,
    variables: ['PROJECT_NAME', 'DELIVERABLE_NAME', 'DESCRIPTION', 'DOD', 'CONSERVED'],
  },
  {
    phase: 'REVIEW',
    title: 'Deliverable Review',
    prompt: `You are reviewing a completed deliverable.

Deliverable: [DELIVERABLE_NAME]
Definition of Done: [DOD]
What was produced: [OUTPUT_SUMMARY]

For each acceptance criterion:
- CLAIM: what was asserted as complete
- EVIDENCE: what you can verify (file:line or output)
- VERDICT: VERIFIED / ASSUMPTION / UNVERIFIED

Flag any gaps, missing items, or quality concerns.`,
    variables: ['DELIVERABLE_NAME', 'DOD', 'OUTPUT_SUMMARY'],
  },
];

/**
 * Fill prompt template with variable values
 */
export function fillPrompt(template: PromptTemplate, values: Record<string, string>): string {
  let result = template.prompt;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), value || `[${key}]`);
  }
  return result;
}
