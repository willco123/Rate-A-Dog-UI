import axios from "axios";

export type LoginData = {
  username: string;
  password: string;
};

// axios.interceptors.response.use(
//   (config) => {
//     config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
//       "Authorization",
//     )}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

const serverURL = "http://localhost:3005/";

const axiosWithAuthHeader = axios.create({
  headers: {
    Authorization: sessionStorage.getItem("Authorization"),
  },
});

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

export async function postBreed(breed: string) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs/breed",
      { breed: breed },
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (err: any) {
    return err.response.data;
  }
}

export async function getLogout() {
  try {
    sessionStorage.removeItem("Authorization");
    const response = await axios.get(
      serverURL + "logout",

      {
        withCredentials: true,
      },
    );

    return response;
  } catch (err: any) {
    return err.response.data;
  }
}
