export interface LoginResponse {
    "access-token": string;
    "refresh-token": string;
    "expires-in": number;
    token: string;
}

export interface UserProfileResponse {
    id: string;
    phone: string;
    fullName: string;
}

