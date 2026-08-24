/**
 * Automated Repository Exclusion Engine (Behind-the-Scenes)
 * Automatically filters out sensitive or excluded repositories from all views,
 * searches, stats, and exports.
 */

export const EXCLUDED_EXACT_NAMES = new Set([
  'saa',
  'saa-pass',
  '12-step',
  '12step',
  '12_step',
  '12-steps',
  '12steps',
  '12-step-program',
  '12_step_program',
  '12stepprogram',
  'twelve-step',
  'twelve-steps',
  'twelve-step-program'
]);

export const EXCLUDED_REGEX_PATTERNS = [
  /\bsaa\b/i,
  /\b12[\s-_]?steps?(\s*program)?\b/i,
  /\btwelve[\s-_]?steps?(\s*program)?\b/i,
  /\bstep\s+program\b/i
];

/**
 * Checks if a repository should be automatically excluded behind the scenes
 * @param {Object} repo - The repository object to evaluate
 * @returns {boolean} - true if repo should be blocked, false otherwise
 */
export function isExcludedRepo(repo) {
  if (!repo) return true;

  const name = String(repo.name || '').toLowerCase().trim();
  const desc = String(repo.description || '').toLowerCase().trim();
  const url = String(repo.url || '').toLowerCase().trim();

  // 1. Exact Name match
  if (EXCLUDED_EXACT_NAMES.has(name)) {
    return true;
  }

  // 2. Pattern matches on name, description, and url
  for (const pattern of EXCLUDED_REGEX_PATTERNS) {
    if (pattern.test(name) || pattern.test(desc) || pattern.test(url)) {
      return true;
    }
  }

  return false;
}

/**
 * Automatically sanitizes any repository array behind the scenes
 * @param {Array} repos - Raw repository list
 * @returns {Array} - Cleaned repository list
 */
export function sanitizeRepoList(repos) {
  if (!Array.isArray(repos)) return [];
  return repos.filter(repo => !isExcludedRepo(repo));
}
