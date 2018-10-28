export default interface AuthServiceInterface {
  login(data: any, guard?: string);
  refresh(guard?: string);
  logout(guard?: string);
  register(data: any, guard?: string);
  forgotPasswordRequest(data: any, guard?: string);
  resetPassword(data: any, guard?: string);
  getUser(guard?: string): Promise<any>;
  getGuardConfig(config: string, guard?: string);
  hasLoggedIn(guard?: string): Promise<boolean>;
}
