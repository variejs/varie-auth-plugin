import { AuthState } from "./stateInterface";

export default function() {
  return {
    isLoggedIn: (state: AuthState) => {
      return state.user;
    }
  };
}
