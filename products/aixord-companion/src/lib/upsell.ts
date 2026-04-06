/**
 * OI-354: Upsell Integration
 * Non-intrusive CTA linking to aixord.pmerit.com.
 * Appears only when user hits a standalone limitation.
 */

export interface UpsellTrigger {
  id: string;
  message: string;
  cta: string;
  url: string;
  condition: string;
}

export const UPSELL_TRIGGERS: UpsellTrigger[] = [
  {
    id: 'auto-gate',
    message: 'Want gates evaluated automatically by AI?',
    cta: 'Try AIXORD Platform',
    url: 'https://aixord.pmerit.com/?ref=companion&trigger=auto-gate',
    condition: 'User manually checks 5+ gates',
  },
  {
    id: 'ai-execute',
    message: 'Want AI to generate code and commit to GitHub?',
    cta: 'Explore AIXORD Execution',
    url: 'https://aixord.pmerit.com/?ref=companion&trigger=execute',
    condition: 'User reaches EXECUTE phase',
  },
  {
    id: 'multi-model',
    message: 'Want multi-model validation with automated audit reports?',
    cta: 'See AIXORD Audit',
    url: 'https://aixord.pmerit.com/?ref=companion&trigger=audit',
    condition: 'User reaches REVIEW phase',
  },
  {
    id: 'export-limit',
    message: 'Need versioned reports with team sharing?',
    cta: 'Upgrade to AIXORD',
    url: 'https://aixord.pmerit.com/?ref=companion&trigger=export',
    condition: 'User exports 3+ reports',
  },
];

/**
 * Check if an upsell should be shown based on user activity.
 * Returns null if no upsell is appropriate.
 */
export async function checkUpsell(
  phase: string,
  gateCheckedCount: number,
  exportCount: number,
): Promise<UpsellTrigger | null> {
  // Check dismissed upsells
  const dismissed = await new Promise<string[]>((resolve) => {
    chrome.storage.local.get('aixord_dismissed_upsells', (result) => {
      resolve(result.aixord_dismissed_upsells ?? []);
    });
  });

  for (const trigger of UPSELL_TRIGGERS) {
    if (dismissed.includes(trigger.id)) continue;

    if (trigger.id === 'auto-gate' && gateCheckedCount >= 5) return trigger;
    if (trigger.id === 'ai-execute' && phase === 'EXECUTE') return trigger;
    if (trigger.id === 'multi-model' && (phase === 'REVIEW' || phase === 'AUDIT')) return trigger;
    if (trigger.id === 'export-limit' && exportCount >= 3) return trigger;
  }

  return null;
}

/**
 * Dismiss an upsell permanently
 */
export async function dismissUpsell(triggerId: string): Promise<void> {
  const dismissed = await new Promise<string[]>((resolve) => {
    chrome.storage.local.get('aixord_dismissed_upsells', (result) => {
      resolve(result.aixord_dismissed_upsells ?? []);
    });
  });
  if (!dismissed.includes(triggerId)) {
    dismissed.push(triggerId);
    chrome.storage.local.set({ aixord_dismissed_upsells: dismissed });
  }
}
