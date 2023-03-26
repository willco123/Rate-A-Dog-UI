import axios from "axios";
import { redirect } from "react-router-dom";

export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = {
  username: string;
  password: string;
  email: string;
};

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker
//       .register("serviceWorker.js", { scope: "/serviceWorker.html" })
//       .then(
//         function (registration) {
//           console.log("ServiceWorker registration successful!");
//         },
//         function (err) {
//           console.log("ServiceWorker registration failed: ", err);
//         },
//       );
//   });
// }

const serverURL = "http://localhost:3005/";

const axiosWithAuthHeader = axios.create({
  headers: {
    Authorization: sessionStorage.getItem("Authorization"),
  },
});

axiosWithAuthHeader.interceptors.response.use(
  (response) => {
    if (response.headers.authorization)
      sessionStorage.setItem("Authorization", response.headers.authorization);
    return response;
  },
  (error) => {
    sessionStorage.removeItem("Authorization");
    if (error.response.status === 401) {
      return redirect("/login");
    }

    return Promise.reject(error);
  },
);

axiosWithAuthHeader.interceptors.request.use(
  function (config) {
    config.headers.Authorization = sessionStorage.getItem("Authorization");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
    // throw new Error(error);
  },
);

export async function getDbDogs() {
  try {
    const response = await axios.get(
      serverURL + "dogs/dbdogs",

      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err: any) {
    return false;
  }
}

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
    return false;
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
    return false;
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

export async function postDogsWithRating(
  rating: number,
  dogUrl: string,
  breed: string,
  subBreed: string | undefined | null,
) {
  try {
    // const fullBreed = breed + (subBreed ? "-" + subBreed : "");
    const dogObject = {
      breed: breed,
      subBreed: subBreed,
      url: dogUrl,
      rating: rating,
    };

    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs",
      { dog: dogObject },
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (err: any) {
    return err.response;
  }
}

export async function getFavourites() {
  try {
    const response = await axiosWithAuthHeader.get(serverURL + "favourites", {
      withCredentials: true,
    });
    return response;
  } catch (err: any) {
    return false;
  }
}

export async function postFavourites() {
  try {
    const response = await axiosWithAuthHeader.get(serverURL + "favourites", {
      withCredentials: true,
    });
    return response;
  } catch (err: any) {
    return false;
  }
}

export async function deleteFavourites() {}
