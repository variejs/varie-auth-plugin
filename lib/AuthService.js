"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var ConfigInterface_1 = require("varie/lib/config/ConfigInterface");
var HttpServiceInterface_1 = require("varie/lib/http/HttpServiceInterface");
var AuthService = /** @class */ (function () {
    function AuthService(app, configService, httpService) {
        this.app = app;
        this.httpService = httpService;
        this.configService = configService;
    }
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.httpService
            .post(this.getGuardConfig("endpoints.login"), {
            email: email,
            password: password
        })
            .then(function (response) {
            return _this.getDriver().loginResponse(response);
        });
    };
    AuthService.prototype.refresh = function () {
        var _this = this;
        return this.httpService
            .post(this.getGuardConfig("endpoints.refresh"))
            .then(function (response) {
            return _this.getDriver().refreshResponse(response);
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return this.httpService
            .post(this.getGuardConfig("endpoints.logout"))
            .then(function (response) {
            return _this.getDriver().logoutResponse(response);
        });
    };
    AuthService.prototype.register = function (name, email, password, confirmPassword) {
        var _this = this;
        return this.httpService
            .post(this.getGuardConfig("endpoints.register"), {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        })
            .then(function (response) {
            return _this.getDriver().registerResponse(response);
        });
    };
    AuthService.prototype.forgotPasswordRequest = function (email) {
        var _this = this;
        return this.httpService
            .post(this.getGuardConfig("endpoints.forgotPassword"), {
            email: email
        })
            .then(function (response) {
            return _this.getDriver().forgotPasswordRequestResponse(response);
        });
    };
    AuthService.prototype.resetPassword = function (token, email, password, confirmPassword) {
        var _this = this;
        return this.httpService
            .post(this.getGuardConfig("endpoints.resetPassword"), {
            email: email,
            token: token,
            password: password,
            password_confirmation: confirmPassword
        })
            .then(function (response) {
            return _this.getDriver().resetPasswordResponse(response);
        });
    };
    AuthService.prototype.getUser = function () {
        return this.httpService.get(this.getGuardConfig("endpoints.user"));
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.getDriver().isLoggedIn();
    };
    AuthService.prototype.getGuardConfig = function (config) {
        return this.configService.get("auth.guards." + this.configService.get("auth.defaults.guard") + "." + config);
    };
    AuthService.prototype.getDriver = function () {
        return this.app.make(this.getGuardConfig("driver"));
    };
    var _a, _b;
    AuthService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("app")),
        __param(1, inversify_1.inject("ConfigService")),
        __param(2, inversify_1.inject("HttpService")),
        __metadata("design:paramtypes", [Object, typeof (_a = typeof ConfigInterface_1.default !== "undefined" && ConfigInterface_1.default) === "function" ? _a : Object, typeof (_b = typeof HttpServiceInterface_1.default !== "undefined" && HttpServiceInterface_1.default) === "function" ? _b : Object])
    ], AuthService);
    return AuthService;
}());
exports.default = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQXV0aFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBK0M7QUFFL0Msb0VBQStEO0FBQy9ELDRFQUF1RTtBQUl2RTtJQUtFLHFCQUNpQixHQUFHLEVBQ08sYUFBOEIsRUFDaEMsV0FBaUM7UUFFeEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRU0sMkJBQUssR0FBWixVQUFhLEtBQUssRUFBRSxRQUFRO1FBQTVCLGlCQVNDO1FBUkMsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzVDLEtBQUssT0FBQTtZQUNMLFFBQVEsVUFBQTtTQUNULENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZCQUFPLEdBQWQ7UUFBQSxpQkFNQztRQUxDLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUM5QyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDRCQUFNLEdBQWI7UUFBQSxpQkFNQztRQUxDLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsSUFBSSxDQUFD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