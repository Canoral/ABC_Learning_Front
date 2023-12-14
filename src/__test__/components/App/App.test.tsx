/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";

import userReducer, {
  login,
  logout,
  toggleDropDown,
} from "../../../redux/store/reducers/user";

describe("userReducer", () => {
  it("should handle login.fulfilled", () => {
    const payload = {
      data: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlwIjoiOjoxIiwiaWQiOjUsInVzZXJuYW1lIjoiQ2FuIiwicm9sZXMiOlsidXNlciJdLCJwZXJtaXNzaW9ucyI6WyJjcnVkX3Rvb2wiXX0sImlhdCI6MTY5NTczMjg3NywiZXhwIjoxNjk1NzM2NDc3fQ.A2SHmFJ5sgUazhE5k3XSomIEZTzaQX5pjd5IXd2oNh8",
      },
    };
    const action = login.fulfilled(payload, "", { username: "", password: "" });
    const newState = userReducer(undefined, action);
    expect(newState.userMessage).toEqual({
      message: "Vous êtes connecté(e)",
      name: "success",
    });
  });

  it("should handle login.rejected", () => {
    const action = login.rejected(null, "", { username: "", password: "" });
    const newState = userReducer(undefined, action);

    expect(newState.userMessage).toEqual({
      message: "L'identifiant ou le mot de passe est incorrect",
      name: "error",
    });
    expect(newState.isLogged).toBe(null);
  });

  it("should handle logout", () => {
    const action = logout();
    const newState = userReducer(undefined, action);

    expect(newState.isLogged).toBe(null);
  });

  it("should handle toggleDropDown", () => {
    const newState = userReducer(undefined, toggleDropDown(true));
    expect(newState.isOpen).toBe(true);
  });
});
