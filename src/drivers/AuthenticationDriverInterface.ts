import { inject, injectable } from "inversify";

export default interface AuthenticationDriverInterface {
  loginResponse(response): Promise<any>;
  logoutResponse(response);
  hasLoggedIn(): Promise<boolean>;
  refreshResponse?(response): Promise<any>;
  registerResponse(response): Promise<any>;
  resetPasswordResponse(response): Promise<any>;
  middlewareRequest(config): Promise<any>;
  middlewareResponse(response): Promise<any>;
}
