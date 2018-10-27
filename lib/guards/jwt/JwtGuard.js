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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var ConfigInterface_1 = require("varie/lib/config/ConfigInterface");
var HttpServiceInterface_1 = require("varie/lib/http/HttpServiceInterface");
var StateServiceInterface_1 = require("varie/lib/state/StateServiceInterface");
var StorageServiceInterface_1 = require("varie/lib/storage/StorageServiceInterface");
var JwtGuard = /** @class */ (function () {
    function JwtGuard(authService, configService, httpService, stateService, storageService) {
        this.tokenName = "auth.token";
        this.httpService = httpService;
        this.authService = authService;
        this.configService = configService;
        this.storageService = storageService;
        this.$store = stateService.getStore();
    }
    JwtGuard.prototype.loginResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setAuthToken(response);
                        return [4 /*yield*/, this.$store.dispatch("auth/getUser")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JwtGuard.prototype.logoutResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    JwtGuard.prototype.refreshResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setAuthToken(response);
                return [2 /*return*/];
            });
        });
    };
    JwtGuard.prototype.registerResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.authService.getGuardConfig("loginAfterRegister")) return [3 /*break*/, 2];
                        this.setAuthToken(response);
                        return [4 /*yield*/, this.$store.dispatch("auth/getUser")];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    JwtGuard.prototype.forgotPasswordRequestResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    JwtGuard.prototype.resetPasswordResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.authService.getGuardConfig("loginAfterReset")) return [3 /*break*/, 2];
                        this.setAuthToken(response);
                        return [4 /*yield*/, this.$store.dispatch("auth/getUser")];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    JwtGuard.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.$store.state.auth.user) {
                            return [2 /*return*/, true];
                        }
                        if (!this.storageService.get(this.tokenName)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.$store.dispatch("auth/getUser").then(function () {
                                return true;
                            }, function () {
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    JwtGuard.prototype.setAuthToken = function (response) {
        this.storageService.set(this.tokenName, JSON.stringify({
            access_token: response.data[this.authService.getGuardConfig("token.accessToken")],
            token_type: response.data[this.authService.getGuardConfig("token.tokenTypeName")],
            expires_at: new Date().getTime() +
                1000 *
                    response.data[this.authService.getGuardConfig("token.expiresIn")]
        }));
    };
    var _a, _b, _c, _d;
    JwtGuard = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("AuthService")),
        __param(1, inversify_1.inject("ConfigService")),
        __param(2, inversify_1.inject("HttpService")),
        __param(3, inversify_1.inject("StateService")),
        __param(4, inversify_1.inject("StorageService")),
        __metadata("design:paramtypes", [Object, typeof (_a = typeof ConfigInterface_1.default !== "undefined" && ConfigInterface_1.default) === "function" ? _a : Object, typeof (_b = typeof HttpServiceInterface_1.default !== "undefined" && HttpServiceInterface_1.default) === "function" ? _b : Object, typeof (_c = typeof StateServiceInterface_1.default !== "undefined" && StateServiceInterface_1.default) === "function" ? _c : Object, typeof (_d = typeof StorageServiceInterface_1.default !== "undefined" && StorageServiceInterface_1.default) === "function" ? _d : Object])
    ], JwtGuard);
    return JwtGuard;
}());
exports.default = JwtGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnd0R3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3VhcmRzL2p3dC9Kd3RHdWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQStDO0FBQy9DLG9FQUErRDtBQUMvRCw0RUFBdUU7QUFDdkUsK0VBQTBFO0FBQzFFLHFGQUFnRjtBQUdoRjtJQVNFLGtCQUN5QixXQUFXLEVBQ1QsYUFBOEIsRUFDaEMsV0FBaUMsRUFDaEMsWUFBbUMsRUFDakMsY0FBdUM7UUFQekQsY0FBUyxHQUFHLFlBQVksQ0FBQztRQVNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRVksZ0NBQWEsR0FBMUIsVUFBMkIsUUFBUTs7Ozs7d0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JCLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFBOzRCQUFqRCxzQkFBTyxTQUEwQyxFQUFDOzs7O0tBQ25EO0lBRVksaUNBQWMsR0FBM0IsVUFBNEIsUUFBUTs7OztLQUFJO0lBRTNCLGtDQUFlLEdBQTVCLFVBQTZCLFFBQVE7OztnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztLQUM3QjtJQUVZLG1DQUFnQixHQUE3QixVQUE4QixRQUFROzs7Ozs2QkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENB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