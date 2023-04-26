import axios from "axios";
import { redirect } from "react-router-dom";
import type { UrlRatingData } from "../types";

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

export async function getDogByUrl(url: string) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs/url",
      { url },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDbDogs() {
  //ratings and votes grouped by subBreed
  try {
    const response = await axios.get(
      serverURL + "dogs",

      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err: any) {
    return false;
  }
}

export async function getAllDbDogs(sampleSize: number) {
  try {
    const authHeader = sessionStorage.getItem("Authorization");
    const response = await axios.post(
      serverURL + "dogs/all",
      { sampleSize: sampleSize, authHeader },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err: any) {
    return false;
  }
}

export async function getMoreDbDogs(
  sampleSize: number,
  currentData: UrlRatingData[],
) {
  try {
    const authHeader = sessionStorage.getItem("Authorization");
    const response = await axios.post(
      serverURL + "dogs/all/more",
      {
        sampleSize: sampleSize,
        currentlyLoadedDocuments: currentData,
        authHeader,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err: any) {
    return false;
  }
}

export async function getAllSorted(
  sortOrder: "asc" | "desc" = "asc",
  sortMode: "averageRating" | "numberOfRates" | "breed" = "averageRating",
  currentMaxIndex: number | null = 0,
  sampleSize: number = 50,
  filteredBreed?: { breed: string; subBreed: string | null },
) {
  try {
    const authHeader = sessionStorage.getItem("Authorization");

    const response = await axios.post(
      serverURL + "dogs/all/sorted",
      {
        sortOrder,
        sortMode,
        currentMaxIndex,
        sampleSize,
        filteredBreed,
        authHeader,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserDbDogs(
  sortOrder: "asc" | "desc" = "desc",
  sortMode:
    | "averageRating"
    | "numberOfRates"
    | "myRating"
    | "breed" = "averageRating",
  currentMaxIndex: number = 0,
  sampleSize = 50,
  filteredBreed?: { breed: string; subBreed: string | null },
) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs/user",
      { sortOrder, sortMode, currentMaxIndex, filteredBreed, sampleSize },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserCount() {
  try {
    const response = await axiosWithAuthHeader.get(
      serverURL + "dogs/user/maxcount",

      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFilteredCount(filteredBreed: {
  breed: string;
  subBreed: string | null;
}) {
  try {
    const response = await axios.post(
      serverURL + "dogs/filtered/maxcount",
      { filteredBreed },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserFilteredCount(filteredBreed: {
  breed: string;
  subBreed: string | null;
}) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs/user/filtered/maxcount",
      { filteredBreed },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
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

export async function postDogs(
  dogUrl: string,
  breed: string,
  subBreed: string | undefined | null,
  rating?: number,
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

    return response.data;
  } catch (err: any) {
    return err.response;
  }
}
