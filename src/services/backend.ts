import axios from "axios";

export type LoginData = {
  username: string;
  password: string;
};

const serverURL = "http://localhost:3005/";

export async function postLogin(loginData: LoginData) {
  try {
    await axios.post(serverURL + "login", loginData, {
      withCredentials: true,
    });

    return true;
  } catch (err: any) {
    return false;
  }
}
