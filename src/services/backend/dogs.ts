import axios from "axios";
import { serverURL, axiosWithAuthHeader } from "./config";
import type { UrlRatingData, SingleUrlOnRate, TableData } from "../../types";

export async function postDogs(
  url: string,
  breed: string,
  subBreed: string | undefined | null,
  rating?: number,
) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs",
      { breed, subBreed, url, rating },
      {
        withCredentials: true,
      },
    );
    return response;
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
  skipCount: number | null = 0,
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
        skipCount,
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
  skipCount: number = 0,
  sampleSize = 50,
  filteredBreed?: { breed: string; subBreed: string | null },
) {
  try {
    const response = await axiosWithAuthHeader.post(
      serverURL + "dogs/user",
      { sortOrder, sortMode, skipCount, filteredBreed, sampleSize },
      {
        withCredentials: true,
      },
    );

    return response.data as UrlRatingData[];
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCount() {
  try {
    const response = await axios.get(
      serverURL + "dogs/maxcount",

      {
        withCredentials: true,
      },
    );

    return response.data.count as number;
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

    return response.data.count as number;
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

    return response.data.count as number;
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
    return response.data.count as number;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getTableData() {
  try {
    const response = await axios.get(serverURL + "dogs/table", {
      withCredentials: true,
    });
    return response.data as TableData[];
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserTableData() {
  try {
    const response = await axiosWithAuthHeader.get(
      serverURL + "dogs/user/table",
      {
        withCredentials: true,
      },
    );

    return response.data as TableData[];
  } catch (error: any) {
    throw new Error(error);
  }
}
