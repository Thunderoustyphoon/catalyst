// User authentication and management utilities
// ⚠️ SECURITY WARNING: This is a localStorage-based auth system for prototyping only.
// For production, replace with:
//   - Server-side authentication (Supabase Auth, Firebase Auth, etc.)
//   - Hashed passwords (bcrypt/argon2) — NEVER store plaintext passwords
//   - HTTP-only session cookies instead of localStorage
//   - Rate limiting on login attempts
//   - CSRF protection
export type UserType = 'student' | 'client';

export interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  type: UserType;
  name: string;
  createdAt: string;
  profile: {
    phone?: string;
    organization?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    diagnosticResults?: {
      experience: string;
      technologies: string[];
      projectType: string;
      learningStyle: string;
      careerGoal: string;
      timeCommitment: string;
      programmingLanguages: string[];
      environment: string;
      problemSolving: string;
      industry: string;
      completedAt: string;
    };
    recommendedTrack?: {
      trackId: string;
      trackName: string;
      adaptations: {
        pacing: string;
        focus: string[];
        recommendations: string[];
      };
      timelineWeeks: number;
      generatedAt: string;
    };
  };
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Storage keys
const USERS_KEY = 'catalyst-users';
const CURRENT_USER_KEY = 'catalyst-current-user';

// Password requirements
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



// Get all users from localStorage
export function getUsers(): User[] {
  try {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

// Save users to localStorage
export function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

// Validate email format
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validate password strength
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
    }
    if (!PASSWORD_REGEX.test(password)) {
      errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Check if email already exists
export function emailExists(email: string, excludeId?: string): boolean {
  const users = getUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase() && user.id !== excludeId);
}

// Generate unique user ID
export function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Create new user account
export function createUser(
  email: string,
  password: string,
  type: UserType,
  name: string,
  profile: Partial<User['profile']> = {}
): AuthResult {
  // Validate inputs
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.errors[0] };
  }
  
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.errors[0] };
  }
  
  if (!name.trim()) {
    return { success: false, error: 'Name is required' };
  }
  
  // Check if email already exists
  if (emailExists(email)) {
    return { success: false, error: 'An account with this email already exists' };
  }
  
  // Create user
  const user: User = {
    id: generateUserId(),
    email: email.toLowerCase(),
    password, // In production, this would be hashed
    type,
    name: name.trim(),
    createdAt: new Date().toISOString(),
    profile
  };
  
  // Save user
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  
  return { success: true, user };
}

// Authenticate user login
export function authenticateUser(email: string, password: string): AuthResult {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }
  
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  if (user.password !== password) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  return { success: true, user };
}

// Get current logged-in user
export function getCurrentUser(): User | null {
  try {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error loading current user:', error);
    return null;
  }
}

// Set current logged-in user
export function setCurrentUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Error saving current user:', error);
  }
}

// Logout user
export function logoutUser(): void {
  setCurrentUser(null);
}

// Update user profile
export function updateUserProfile(userId: string, updates: Partial<User>): AuthResult {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  // Validate email if being updated
  if (updates.email && updates.email !== users[userIndex].email) {
    const emailValidation = validateEmail(updates.email);
    if (!emailValidation.isValid) {
      return { success: false, error: emailValidation.errors[0] };
    }
    
    if (emailExists(updates.email, userId)) {
      return { success: false, error: 'An account with this email already exists' };
    }
  }
  
  // Validate password if being updated
  if (updates.password) {
    const passwordValidation = validatePassword(updates.password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors[0] };
    }
  }
  
  // Update user
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);
  
  // Update current user if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[userIndex]);
  }
  
  return { success: true, user: users[userIndex] };
}