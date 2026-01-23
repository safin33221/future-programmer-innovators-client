/* =========================
   USER ROLES
========================= */

export enum UserRole {
  GUEST = "GUEST",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  MENTOR = "MENTOR",
  MODERATOR = "MODERATOR",
}

/* =========================
   BASIC USER INFO
========================= */

export interface IUserInfo {
  name?: string;
  email: string;
  role: string;
}

/* =========================
   MAIN USER INTERFACE
========================= */

export interface IUser {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  role: UserRole;

  isVerified: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  profilePhoto?: string;
  phone?: string;

  // one-to-one role profiles
  admin?: IAdmin | null;
  member?: IMember | null;
  mentor?: IMentor | null;
  moderator?: IModerator | null;
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
  profileImage?: string;
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

  profileImage?: string;
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

  github?: string;
  linkedin?: string;
  portfolio?: string;

  profileImage?: string;
}

/* =========================
   MODERATOR
========================= */

export interface IModerator {
  id: string;
  userId: string;

  permissions: IModeratorPermission[];
}

/* =========================
   MODERATOR PERMISSIONS
========================= */

export interface IModeratorPermission {
  permissionId: string;
  name: string;
}
