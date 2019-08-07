import { injectable, inject } from "inversify";
import AuthServiceInterface from "varie-auth-plugin/lib/AuthServiceInterface";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";

@injectable()
export default class Auth implements RouteMiddlewareInterface {
  private authService;

  constructor(@inject("AuthService") authService: AuthServiceInterface) {
    this.authService = authService;
  }

  handler(to, from, next) {
    this.authService.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        return next();
      }
      return next({
        name: "login",
      });
    });
  }
}
