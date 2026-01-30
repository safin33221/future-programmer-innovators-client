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

  profile?: IProfile
  memberShipApplication?: IMembershipApplication;
}

export interface IMembershipApplication {
  id: string;
  userId: string;

  studentId: string;
  departmentId: string;
  sessionId: string;
  learningTrackId: string | null;
  phoneNumber: string;
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

interface IProfile {
  id: string;
  userId: string;

  adminLevel: AdminLevel;




  studentId: string;
  departmentId: string;
  sessionId: string;

  batch?: string | null;
  skills?: string[] | null;



  createdAt?: string;
  updatedAt?: string;

  /* ===== RELATIONS ===== */
  department?: {
    id: string;
    name: string;
  };

  session?: {
    id: string;
    name: string;
  };


  expertise: string;
  designation: string;
  experience: string;
  company?: string;

  github?: string;
  linkedin?: string;
  portfolio?: string;



  permissions: IModeratorPermission[];
  moderationLevel?: string



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

