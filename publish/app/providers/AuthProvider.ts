import AuthService from "@app/services/AuthService";
import ServiceProvider from "varie/lib/support/ServiceProvider";
import JwtDriver from "varie-authentication-plugin/lib/drivers/jwt/JwtDriver";

export default class AuthenticationServiceProvider extends ServiceProvider {
  public register() {
    this.app.singleton("JwtDriver", JwtDriver);
    this.app.bind("AuthService", AuthService);
  }
}
