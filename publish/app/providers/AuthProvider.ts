import AuthService from "@app/services/AuthService";
import AxiosHttpService from "varie/lib/http/AxiosHttpService";
import ServiceProvider from "varie/lib/support/ServiceProvider";
import AuthMiddleware from "varie-authentication-plugin/lib/AuthMiddleware";
import JwtDriver from "varie-authentication-plugin/lib/drivers/jwt/JwtDriver";

export default class AuthenticationServiceProvider extends ServiceProvider {
  public boot() {
    let $httpService = this.app.make<AxiosHttpService>("HttpService");
    $httpService.registerMiddleware(AuthMiddleware);
  }

  public register() {
    this.app.singleton("JwtDriver", JwtDriver);
    this.app.bind("AuthService", AuthService);
  }
}
