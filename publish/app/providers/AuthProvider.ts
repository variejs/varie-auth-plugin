import AuthService from "@app/services/AuthService";
import ServiceProvider from "varie/lib/support/ServiceProvider";
import JwtGuard from "varie-authentication-plugin/lib/guards/jwt/JwtGuard";

export default class AuthenticationServiceProvider extends ServiceProvider {
  public register() {
    this.app.singleton("JwtGuard", JwtGuard);
    this.app.bind("AuthService", AuthService);
  }
}
