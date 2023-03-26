import { Breeds } from "../types.js";
import axios, { AxiosResponse } from "axios";

export async function getBreeds() {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const breedsList = response.data;

    return breedsList.message as Breeds;
  } catch (err: any) {
    return false;
  }
}

export async function getRandomDogImage() {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    const imageURL = response.data;
    return imageURL.message as string;
  } catch (err: any) {
    return false;
  }
}

export async function getRandomDogImageByBreed(
  breed: string,
  subBreed: string | null,
) {
  try {
    let response: AxiosResponse<any, any>;
    if (subBreed)
      response = await axios.get(
        "https://dog.ceo/api/breed/" +
          breed +
          "/" +
          subBreed +
          "/images/random",
      );
    else
      response = await axios.get(
        "https://dog.ceo/api/breed/" + breed + "/images/random",
      );
    const imageURL = response.data;
    return imageURL.message as string;
  } catch (err: any) {
    return false;
  }
}
