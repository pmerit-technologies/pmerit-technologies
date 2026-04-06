/**
 * OI-349: AI Tool Detection
 * Detects which AI tool is active in the current browser tab.
 * Adapts prompt format for each tool's input conventions.
 */

export interface DetectedTool {
  name: string;
  id: string;
  inputSelector: string;
  submitSelector: string;
  icon: string;
}

const AI_TOOLS: DetectedTool[] = [
  {
    name: 'ChatGPT',
    id: 'chatgpt',
    inputSelector: '#prompt-textarea, textarea[data-id="root"]',
    submitSelector: 'button[data-testid="send-button"]',
    icon: 'https://chat.openai.com/favicon.ico',
  },
  {
    name: 'Claude',
    id: 'claude',
    inputSelector: 'div[contenteditable="true"].ProseMirror, textarea',
    submitSelector: 'button[aria-label="Send Message"]',
    icon: 'https://claude.ai/favicon.ico',
  },
  {
    name: 'Gemini',
    id: 'gemini',
    inputSelector: 'rich-textarea .ql-editor, textarea',
    submitSelector: 'button.send-button, button[aria-label="Send message"]',
    icon: 'https://gemini.google.com/favicon.ico',
  },
  {
    name: 'Cursor',
    id: 'cursor',
    inputSelector: 'textarea.chat-input',
    submitSelector: 'button.send-btn',
    icon: '',
  },
  {
    name: 'DeepSeek',
    id: 'deepseek',
    inputSelector: 'textarea#chat-input',
    submitSelector: 'button.send-button',
    icon: '',
  },
];

const URL_PATTERNS: Array<{ pattern: RegExp; toolId: string }> = [
  { pattern: /chat\.openai\.com|chatgpt\.com/i, toolId: 'chatgpt' },
  { pattern: /claude\.ai/i, toolId: 'claude' },
  { pattern: /gemini\.google\.com/i, toolId: 'gemini' },
  { pattern: /cursor\.sh|cursor\.com/i, toolId: 'cursor' },
  { pattern: /chat\.deepseek\.com/i, toolId: 'deepseek' },
];

/**
 * Detect AI tool from a tab URL
 */
export function detectToolFromUrl(url: string): DetectedTool | null {
  for (const { pattern, toolId } of URL_PATTERNS) {
    if (pattern.test(url)) {
      return AI_TOOLS.find(t => t.id === toolId) ?? null;
    }
  }
  return null;
}

/**
 * Get all supported tool definitions
 */
export function getSupportedTools(): DetectedTool[] {
  return AI_TOOLS;
}
