// Blacklisted usernames — add more as needed
export const BLACKLISTED = new Set([
  'admin', 'administrator', 'root', 'system', 'support', 'help',
  'mod', 'moderator', 'staff', 'owner', 'official',
  'api', 'auth', 'login', 'logout', 'signup', 'register',
  'dashboard', 'settings', 'profile', 'user', 'users',
  'null', 'undefined', 'true', 'false',
  'fuck', 'shit', 'ass', 'bitch', 'nigger', 'nigga', 'faggot', 'cunt',
  'www', 'http', 'https', 'cdn', 'static', 'media', 'img',
])

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/

export function validateUsername(username: string): string | null {
  const u = username.toLowerCase().trim()
  if (!USERNAME_REGEX.test(username)) {
    return 'Username must be 3–20 characters and only contain letters, numbers, _ or -'
  }
  if (BLACKLISTED.has(u)) {
    return 'That username is not allowed'
  }
  return null
}
