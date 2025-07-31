type User = {
    id: string;
    name: string;   
    email: string;
    managerId:string;
    role: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { User };