
export interface ActivitiesProps {
    users: User[];
    onUserClick: (userId: number | string) => void;
}

export interface User {
    id: number | string;
    name: string;
    email: string;
    password: string;
    role: string;
}
