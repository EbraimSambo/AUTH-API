export interface JwtPayload {
  sub: string;
  email: string;
  refreshToken?: string;
}
