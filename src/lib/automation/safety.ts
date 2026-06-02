const DANGEROUS_PATTERNS = [
  /api[_-]?key/i,
  /\btoken\b/i,
  /bearer\s+[a-zA-Z0-9\-._~+/]+=*/i,
  /authorization:\s*\S+/i,
  /\bpassword\b/i,
  /\bsecret\b/i,
  /webhook\.site/i,
  /localhost:\d+/i,
  /192\.168\.\d+\.\d+/i,
  /10\.\d+\.\d+\.\d+/i,
  /172\.(1[6-9]|2\d|3[01])\.\d+\.\d+/i,
  /[a-zA-Z0-9._%+-]+@(?!example\.com|YOUR_EMAIL)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /https?:\/\/(?!placeholder|example|YOUR_|darhous)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[a-zA-Z0-9/_-]{10,}/i,
  // Long high-entropy run (20+ chars) that contains at least one digit —
  // matches API keys/tokens/hashes while ignoring legitimate long camelCase
  // identifiers like n8n node types (e.g. "googleCalendarTrigger").
  /(?=[A-Za-z0-9]*[0-9])[A-Za-z0-9]{20,}/,
];

const SAFE_PLACEHOLDER_PATTERN = /YOUR_[A-Z_]+/;

export function containsDangerousPattern(text: string): boolean {
  if (SAFE_PLACEHOLDER_PATTERN.test(text)) return false;
  return DANGEROUS_PATTERNS.some((re) => re.test(text));
}

export function scanJsonForDangerousPatterns(json: unknown, path = ""): string[] {
  const issues: string[] = [];
  if (typeof json === "string") {
    if (containsDangerousPattern(json)) {
      issues.push(`Suspicious value at ${path || "root"}: "${json.slice(0, 60)}..."`);
    }
  } else if (Array.isArray(json)) {
    json.forEach((item, i) => issues.push(...scanJsonForDangerousPatterns(item, `${path}[${i}]`)));
  } else if (json && typeof json === "object") {
    for (const [key, val] of Object.entries(json)) {
      issues.push(...scanJsonForDangerousPatterns(val, path ? `${path}.${key}` : key));
    }
  }
  return issues;
}

export function isSafeForDisplay(json: unknown): boolean {
  return scanJsonForDangerousPatterns(json).length === 0;
}
