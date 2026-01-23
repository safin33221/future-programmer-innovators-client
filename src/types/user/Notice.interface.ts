export interface INotice {
    id: string;
    title: string;
    content?: string;
    published: boolean;
    createdAt: string;
    createdBy?: {
        email: string;
    };
    updatedAt: string
}
