import axios from "axios";
import { serverURL, axiosWithAuthHeader } from "./config";
import type { UrlRatingData, SingleUrlOnRate } from "../../types";

export async function postDogs(
  url: string,
  breed: string,
  subBreed: string | undefined | null,
  rating?: number,
) {
  try {
    await axiosWithAuthHeader.post(
      serverURL + "dogs",
      { breed, subBreed, url, rating },
      {
        withCredentials: true,
      },
    );
    return;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getDogByUrl(url: string) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs/url",
      { url },
      {
        withCredentials: true,
      },
    );
    return response.data as SingleUrlOnRate;
  } catch (error: any) {
    throw new Error(error);
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

    return response.data as UrlRatingData[];
  } catch (err: any) {
    throw new Error(err);
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

    return response.data as UrlRatingData[];
  } catch (err: any) {
    throw new Error(err);
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

    return response.data as UrlRatingData[];
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

    return response.data as UrlRatingData[];
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

    return response.data as number;
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

    return response.data as number;
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
    return response.data as number;
  } catch (error: any) {
    throw new Error(error);
  }
}
