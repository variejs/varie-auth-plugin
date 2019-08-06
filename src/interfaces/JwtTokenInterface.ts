export default interface JwtTokenInterface {
  access_token: string;
  token_type: string;
  expires_at: number;
  refresh_token?: string;
}
