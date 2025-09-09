export interface LoginRequest { User: string; Password: string; }
export interface LoginResponse { token: string; expiresIn?: number; user?: any; }