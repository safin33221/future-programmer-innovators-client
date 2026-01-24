export interface IDepartment {
    id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;

    _count?: {
        members: number;
        memberApplications: number;
    };
}