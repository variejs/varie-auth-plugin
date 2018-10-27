import { injectable, inject } from "inversify";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";
import AuthServiceInterface from "varie-authentication-plugin/lib/AuthServiceInterface";

@injectable()
export default class Auth implements RouteMiddlewareInterface {
  private authService;

  constructor(@inject("AuthService") authService: AuthServiceInterface) {
    this.authService = authService;
  }

  handler(to, from, next) {
    this.authService.hasLoggedIn().then(hasLoggedIn => {
      if (hasLoggedIn) {
        return next();
      }
      return next({
        name: "login"
      });
    });
  }
}
