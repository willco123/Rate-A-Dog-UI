import axios from "axios";
import type { LoginData, RegisterData } from "../../types";
import { serverURL, axiosWithAuthHeader } from "./config";

export async function postLogin(loginData: LoginData) {
  try {
    const response = await axios.post(serverURL + "login", loginData, {
      withCredentials: true,
    });
    sessionStorage.setItem("Authorization", response.headers.authorization);
    return true;
  } catch (err: any) {
    return false;
  }
}

export async function postRegister(registerData: RegisterData) {
  try {
    const response = await axios.post(serverURL + "register", registerData, {
      withCredentials: true,
    });
    return response.status;
  } catch (err: any) {
    return err.response.data;
  }
}

export async function getLogout() {
  try {
    sessionStorage.removeItem("Authorization");
    await axios.get(
      serverURL + "logout",

      {
        withCredentials: true,
      },
    );
    return;
  } catch (err: any) {
    return;
  }
}

export async function getRefresh() {
  try {
    const response = await axiosWithAuthHeader.get(serverURL + "refresh", {
      withCredentials: true,
    });

    if (response.headers["authorization"])
      sessionStorage.setItem("Authorization", response.headers.authorization);
    if (response.status === 200) return true;
    return false;
  } catch (err: any) {
    return false;
  }
}
