export interface AuthObject {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    token: string;
}

export interface AuthProfileObject extends AuthObject{
    id: string;
    phone: string;
    fullName: string;
    avatar: string;
}

export interface UserObject {
    id: string;
}