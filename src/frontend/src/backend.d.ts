import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    bio: string;
    username: string;
    createdAt: Time;
    plan: PlanType;
    email: string;
    avatarUrl: string;
}
export type Time = bigint;
export interface SavedContent {
    id: string;
    content: string;
    owner: Principal;
    createdAt: Time;
    tags: Array<string>;
    toolName: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface ToolUsageStats {
    count: bigint;
    toolName: string;
}
export interface UserStats {
    totalUsage: bigint;
    profile: UserProfile;
    savedContentCount: bigint;
}
export enum PlanType {
    pro = "pro",
    premium = "premium",
    free = "free"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContent(id: string): Promise<void>;
    favoriteTool(toolId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFavoriteTools(): Promise<Array<string>>;
    getPlan(): Promise<PlanType | null>;
    getPlatformToolUsageStats(): Promise<Array<ToolUsageStats>>;
    getProfile(): Promise<UserProfile | null>;
    getSavedContent(): Promise<Array<SavedContent>>;
    getSavedContentCount(): Promise<bigint>;
    getToolUsageCount(toolName: string): Promise<bigint>;
    getTotalUsageStats(): Promise<{
        breakdown: Array<ToolUsageStats>;
        totalUses: bigint;
    }>;
    getTotalUserCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllUsers(): Promise<Array<UserStats>>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    recordToolUsage(toolName: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveContent(content: SavedContent): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    unfavoriteTool(toolId: string): Promise<void>;
    updatePlan(plan: PlanType): Promise<void>;
    updateProfile(profile: UserProfile): Promise<void>;
}
