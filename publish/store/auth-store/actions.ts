import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { AuthState } from "./stateInterface";
import AuthService from "@app/services/AuthService";

export default function(authService: AuthService) {
  return {
    login: (context: ActionContext<AuthState, RootState>, data) => {
      return authService.login(data).then(response => {
        return response;
      });
    },
    register: (context: ActionContext<AuthState, RootState>, data) => {
      return authService.register(data).then(response => {
        return response;
      });
    },
    forgotPasswordRequest: (
      context: ActionContext<AuthState, RootState>,
      data
    ) => {
      return authService.forgotPasswordRequest(data);
    },
    resetPassword: (context: ActionContext<AuthState, RootState>, data) => {
      return authService.resetPassword(data).then(response => {
        return response;
      });
    },
    getUser: (context: ActionContext<AuthState, RootState>) => {
      return authService.getUser().then(response => {
        context.commit("SET_AUTH_USER", response.data);
        return response.data;
      });
    },
    logout: (context: ActionContext<AuthState, RootState>) => {
      return authService.logout().then(response => {
        context.commit("REMOVE_AUTH");
        return response;
      });
    }
  };
}
