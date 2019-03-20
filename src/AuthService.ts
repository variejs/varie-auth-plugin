import { injectable, inject } from "inversify";
import AuthServiceInterface from "./AuthServiceInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import AuthDriverInterface from "./drivers/AuthDriverInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
import ApplicationInterface from "varie/lib/foundation/ApplicationInterface";

@injectable()
export default class AuthService implements AuthServiceInterface {
  protected app: ApplicationInterface;
  protected configService: ConfigInterface;
  protected httpService: HttpServiceInterface;

  constructor(
    @inject("app") app,
    @inject("ConfigService") configService: ConfigInterface,
    @inject("HttpService") httpService: HttpServiceInterface,
  ) {
    this.app = app;
    this.httpService = httpService;
    this.configService = configService;
  }

  public login(data: object, guard?: string): Promise<Response> {
    return this.httpService
      .post(this.getGuardConfig("endpoints.login", guard), data, {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).loginResponse(response);
      });
  }

  public refresh(guard?: string) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.refresh", guard), {
        guard,
      })
      .then((response) => {
        let driver = this.getDriver(guard);
        if (driver.refreshResponse) {
          return driver.refreshResponse(response);
        }
      });
  }

  public logout(guard?: string) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.logout", guard), {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).logoutResponse(response);
      });
  }

  public register(data: object, guard?: string) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.register", guard), data, {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).registerResponse(response);
      });
  }

  public forgotPasswordRequest(data: object, guard?: string) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.forgotPassword", guard), data, {
        guard,
      })
      .then((response) => {
        return response;
      });
  }

  public resetPassword(data: object, guard?: string) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.resetPassword", guard), data, {
        guard,
      })
      .then((response) => {
        return this.getDriver(guard).resetPasswordResponse(response);
      });
  }

  public getUser(guard?: string) {
    return this.httpService.get(this.getGuardConfig("endpoints.user", guard), {
      guard,
    });
  }

  public isLoggedIn(guard?: string) {
    return this.getDriver(guard).isLoggedIn(
      guard || this.configService.get("auth.defaults.guard"),
    );
  }

  public getDefaultGuard() {
    return this.configService.get("auth.defaults.guard");
  }

  public getGuardConfig(config: string, guard?: string): any {
    return this.configService.get(
      `auth.guards.${guard || this.getDefaultGuard()}.${config}`,
    );
  }

  public getGuardFromResponse(response) {
    return response.config.guard || this.getDefaultGuard();
  }

  public getDriver(guard?): AuthDriverInterface {
    return this.app.make(this.getGuardConfig("driver", guard));
  }

  public clearAuthStorage(guard?: string) {
    let driver = this.getDriver(guard || this.getDefaultGuard());
    if (driver.clearStorage) {
      driver.clearStorage(guard || this.getDefaultGuard());
    }
  }

  public getStoragePath() {
    return this.configService.get("auth.defaults.storagePath");
  }
}
