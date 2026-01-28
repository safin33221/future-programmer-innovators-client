export enum UserRole {
  GUEST = "GUEST",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  MODERATOR = "MODERATOR",
  MEMBER = "MEMBER",
  MENTOR = "MENTOR",
}
/* =========================
   MAIN USER INTERFACE
========================= */

export interface UserInfo {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  // Add these common fields to UserInfo
  phone?: string;
  bio?: string;
  profileImage?: string; // Moved from role-specific interfaces

  role: UserRole;

  isVerified: boolean;
  isActive: boolean;
  isDelete: boolean;

  lastLoginAt?: string;
  passwordChangedAt?: string;
  emailVerifiedAt?: string;

  createdAt: string;
  updatedAt: string;

  admin?: IAdmin;
  member?: IMember;
  mentor?: IMentor;
  moderator?: IModerator;
  memberShipApplication?: IMembershipApplication;
}

export interface IMembershipApplication {
  id: string;
  userId: string;

  studentId: string;
  departmentId: string;
  sessionId: string;
  learningTrackId: string | null;

  profileImage: string | null;
  interestedAreas: string[];

  status: "PENDING" | "APPROVED" | "REJECTED";

  joinMotivation?: string | null;

  createdAt: string;
  updatedAt: string;
  reviewComment?: string
}


/* =========================
   ADMIN
========================= */

export enum AdminLevel {
  BASIC = "BASIC",
  SUPER = "SUPER",
}

export interface IAdmin {
  id: string;
  userId: string;

  adminLevel: AdminLevel;
  // REMOVE profileImage from here
}

/* =========================
   MEMBER
========================= */

export interface IMember {
  id: string;
  userId: string;

  studentId: string;
  departmentId: string;
  sessionId: string;

  // Add these fields for Member
  batch?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;

  // REMOVE profileImage from here
}

/* =========================
   MENTOR
========================= */

export interface IMentor {
  id: string;
  userId: string;

  expertise: string;
  designation: string;
  experience: string;
  company?: string;

  github?: string;
  linkedin?: string;
  portfolio?: string;

  // REMOVE profileImage from here
}

/* =========================
   MODERATOR
========================= */
export enum ModeratorPermissionType {
  // Content Moderation
  VIEW_CONTENT = "VIEW_CONTENT",
  APPROVE_CONTENT = "APPROVE_CONTENT",
  EDIT_CONTENT = "EDIT_CONTENT",
  DELETE_CONTENT = "DELETE_CONTENT",

  // User Management
  VIEW_USERS = "VIEW_USERS",
  WARN_USERS = "WARN_USERS",
  SUSPEND_USERS = "SUSPEND_USERS",

  // Forum Moderation
  MANAGE_FORUMS = "MANAGE_FORUMS",
  MANAGE_THREADS = "MANAGE_THREADS",
  MANAGE_COMMENTS = "MANAGE_COMMENTS",

  // System
  VIEW_REPORTS = "VIEW_REPORTS",
  MANAGE_REPORTS = "MANAGE_REPORTS",
}

export interface IModeratorPermission {
  id: string;
  name: string;
  type: ModeratorPermissionType;
  description: string;
  category: "CONTENT" | "USER" | "FORUM" | "SYSTEM";
}

export interface IModerator {
  id: string;
  userId: string;

  permissions: IModeratorPermission[];
  moderationLevel?: string;
}