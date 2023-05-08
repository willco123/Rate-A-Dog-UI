import axios from "axios";
import { redirect } from "react-router-dom";

export const serverURL = "http://localhost:3005/";

export const axiosWithAuthHeader = axios.create({
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
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
