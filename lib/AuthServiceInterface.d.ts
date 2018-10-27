export default interface AuthServiceInterface {
  login(email: string, password: string): any;
  refresh(): any;
  logout(): any;
  register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): any;
  forgotPasswordRequest(email: string): any;
  resetPassword(
    token: string,
    email: string,
    password: string,
    confirmPassword: string
  ): any;
  getUser(): Promise<any>;
  getGuardConfig(config: string): any;
  isLoggedIn(): Promise<boolean>;
}
