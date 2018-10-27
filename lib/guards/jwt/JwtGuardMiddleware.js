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
var StorageServiceInterface_1 = require("varie/lib/storage/StorageServiceInterface");
var JwtGuardMiddleware = /** @class */ (function () {
    function JwtGuardMiddleware(authService, storageService) {
        this.authService = authService;
        this.storageService = storageService;
    }
    // @ts-ignore
    JwtGuardMiddleware.prototype.request = function (config) {
        var _this = this;
        return new Promise(function (resolve) {
            var token = JSON.parse(_this.storageService.get("auth.token"));
            if (token) {
                if (!config.url.includes(_this.authService.getGuardConfig("endpoints.refresh")) &&
                    token.expires_at < new Date().getTime()) {
                    _this.authService.refresh().then(function () {
                        token = JSON.parse(_this.storageService.get("auth.token"));
                        config.headers.common.Authorization = token.token_type + " " + token.access_token;
                        resolve(config);
                    });
                }
                else {
                    config.headers.common.Authorization = token.token_type + " " + token.access_token;
                    resolve(config);
                }
            }
            else {
                resolve(config);
            }
        });
    };
    JwtGuardMiddleware.prototype.response = function (response) {
        return response;
    };
    JwtGuardMiddleware.prototype.responseError = function (error) {
        return error;
    };
    var _a;
    JwtGuardMiddleware = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("AuthService")),
        __param(1, inversify_1.inject("StorageService")),
        __metadata("design:paramtypes", [Object, typeof (_a = typeof StorageServiceInterface_1.default !== "undefined" && StorageServiceInterface_1.default) === "function" ? _a : Object])
    ], JwtGuardMiddleware);
    return JwtGuardMiddleware;
}());
exports.default = JwtGuardMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnd0R3VhcmRNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2d1YXJkcy9qd3QvSnd0R3VhcmRNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQStDO0FBQy9DLHFGQUFnRjtBQUloRjtJQUtFLDRCQUN5QixXQUFXLEVBQ1IsY0FBdUM7UUFFakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVELGFBQWE7SUFDTixvQ0FBTyxHQUFkLFVBQWUsTUFBTTtRQUFyQixpQkEyQkM7UUExQkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDeEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksS0FBSyxFQUFFO2dCQUNULElBQ0UsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FDckQ7b0JBQ0QsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUN2QztvQkFDQSxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQzt3QkFDOUIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFNLEtBQUssQ0FBQyxVQUFVLFNBQ3ZELEtBQUssQ0FBQyxZQUNOLENBQUM7d0JBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQU0sS0FBSyxDQUFDLFVBQVUsU0FDdkQsS0FBSyxDQUFDLFlBQ04sQ0FBQztvQkFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2pCO2FBQ0Y7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0scUNBQVEsR0FBZixVQUFnQixRQUFRO1FBQ3RCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTSwwQ0FBYSxHQUFwQixVQUFxQixLQUFLO1FBQ3hCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7SUFqRGtCLGtCQUFrQjtRQUR0QyxzQkFBVSxFQUFFO1FBT1IsV0FBQSxrQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3JCLFdBQUEsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO3FFQUFpQixpQ0FBdUIsb0JBQXZCLGlDQUF1QjtPQVBoRCxrQkFBa0IsQ0FrRHRDO0lBQUQseUJBQUM7Q0FBQSxBQWxERCxJQWtEQztrQkFsRG9CLGtCQUFrQiJ9