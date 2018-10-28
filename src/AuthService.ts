import { injectable, inject } from "inversify";
import AuthServiceInterface from "./AuthServiceInterface";
import ConfigInterface from "varie/lib/config/ConfigInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";
import ApplicationInterface from "varie/lib/foundation/ApplicationInterface";
import AuthenticationDriverInterface from "./drivers/AuthenticationDriverInterface";

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

  public login(data, guard?) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.login", guard), data, {
        guard
      })
      .then(response => {
        return this.getDriver(guard).loginResponse(response);
      });
  }

  public refresh(guard?) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.refresh", guard), {
        guard
      })
      .then(response => {
        let driver = this.getDriver(guard);
        if (driver.refreshResponse) {
          return driver.refreshResponse(response);
        }
      });
  }

  public logout(guard?) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.logout", guard), {
        guard
      })
      .then(response => {
        return this.getDriver(guard).logoutResponse(response);
      });
  }

  public register(data, guard?) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.register", guard), data, {
        guard
      })
      .then(response => {
        return this.getDriver(guard).registerResponse(response);
      });
  }

  public forgotPasswordRequest(data, guard?) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.forgotPassword", guard), data, {
        guard
      })
      .then(response => {
        return response;
      });
  }

  public resetPassword(data, guard?) {
    return this.httpService
      .post(this.getGuardConfig("endpoints.resetPassword", guard), data, {
        guard
      })
      .then(response => {
        return this.getDriver(guard).resetPasswordResponse(response);
      });
  }

  public getUser(guard?) {
    return this.httpService.get(this.getGuardConfig("endpoints.user", guard), {
      guard
    });
  }

  public isLoggedIn(guard?) {
    return this.getDriver(guard).isLoggedIn(
      guard || this.configService.get("auth.defaults.guard")
    );
  }

  public getDefaultGuard() {
    return this.configService.get("auth.defaults.guard");
  }

  public getGuardConfig(config, guard?): any {
    return this.configService.get(
      `auth.guards.${guard || this.getDefaultGuard()}.${config}`
    );
  }

  public getDriver(guard?): AuthenticationDriverInterface {
    return this.app.make(this.getGuardConfig("driver", guard));
  }

  public getStoragePath() {
    return this.configService.get("auth.defaults.storagePath", "admin");
  }
}
