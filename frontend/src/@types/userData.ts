export interface newUserData {
    name: string;
    password: string
    email: string;

}

export interface UserData {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
