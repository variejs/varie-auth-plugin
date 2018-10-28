import { AuthState } from "./stateInterface";

export default function() {
  return {
    user: (state: AuthState) => guard => {
      return state.guards[guard];
    }
  };
}
