import { injectable, inject } from "inversify";
import JwtDriver from "./drivers/jwt/JwtDriver";
import AuthServiceInterface from "./AuthServiceInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
import ApplicationInterface from "varie/lib/foundation/ApplicationInterface";

@injectable()
export default class AuthService implements AuthServiceInterface {
  private app: ApplicationInterface;
  private configService: ConfigInterface;
  private httpService: HttpServiceInterface;

  constructor(
    @inject("app") app,
    @inject("ConfigService") configService: ConfigInterface,
    @inject("HttpService") httpService: HttpServiceInterface
  ) {
    this.app = app;
    this.httpService = httpService;
    this.configService = configService;
  }

  public login(data) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.login"), data)
      .then(response => {
        return this.getDriver().loginResponse(response);
      });
  }

  public refresh() {
    return this.httpService
      .post(this.getGuardConfig("endpoints.refresh"))
      .then(response => {
        return this.getDriver().refreshResponse(response);
      });
  }

  public logout() {
    return this.httpService
      .post(this.getGuardConfig("endpoints.logout"))
      .then(response => {
        return this.getDriver().logoutResponse(response);
      });
  }

  public register(data) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.register"), data)
      .then(response => {
        return this.getDriver().registerResponse(response);
      });
  }

  public forgotPasswordRequest(data) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.forgotPassword"), data)
      .then(response => {
        return this.getDriver().forgotPasswordRequestResponse(response);
      });
  }

  public resetPassword(data) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.resetPassword"), data)
      .then(response => {
        return this.getDriver().resetPasswordResponse(response);
      });
  }

  public getUser() {
    return this.httpService.get(this.getGuardConfig("endpoints.user"));
  }

  public hasLoggedIn() {
    return this.getDriver().hasLoggedIn();
  }

  public getGuardConfig(config): any {
    return this.configService.get(
      `auth.guards.${this.configService.get("auth.defaults.guard")}.${config}`
    );
  }

  // TODO - drivers should have an interface
  private getDriver(): JwtDriver {
    return this.app.make(this.getGuardConfig("driver"));
  }
}
