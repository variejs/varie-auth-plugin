import AuthStore from "@store/auth/AuthStore";
import AuthService from "@app/services/AuthService";
import AxiosHttpService from "varie/lib/http/AxiosHttpService";
import ServiceProvider from "varie/lib/support/ServiceProvider";
import AuthMiddleware from "varie-auth-plugin/lib/AuthMiddleware";
import JwtDriver from "varie-auth-plugin/lib/drivers/jwt/JwtDriver";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";

export default class AuthServiceProvider extends ServiceProvider {
  public boot() {
    let $httpService = this.app.make<AxiosHttpService>("HttpService");
    let stateService = this.app.make<StateServiceInterface>("StateService");

    $httpService.registerMiddleware(AuthMiddleware);
    stateService.registerStore(AuthStore);
  }

  public register() {
    this.app.singleton("JwtDriver", JwtDriver);
    this.app.bind("AuthService", AuthService);
  }
}
