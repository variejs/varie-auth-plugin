import { inject, injectable } from "inversify";

export default interface AuthDriverInterface {
  loginResponse(response): Promise<any>;
  logoutResponse(response);
  isLoggedIn(guard: string): Promise<boolean>;
  refreshResponse?(response): Promise<any>;
  registerResponse(response): Promise<any>;
  resetPasswordResponse(response): Promise<any>;
  middlewareRequest?(config): Promise<any>;
  middlewareResponse?(response): Promise<any>;
}
