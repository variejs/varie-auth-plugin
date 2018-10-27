export default interface AuthServiceInterface {
  login(data: any);
  refresh();
  logout();
  register(data: any);
  forgotPasswordRequest(data: any);
  resetPassword(data: any);
  getUser(): Promise<any>;
  getGuardConfig(config: string);
  hasLoggedIn(): Promise<boolean>;
}
