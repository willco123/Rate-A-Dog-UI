import { Breeds } from "../types";

export async function getBreeds() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const breedsList = await response.json();

  return breedsList.message as Breeds;
}

export async function getRandomDogImage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const imageURL = await response.json();
  return imageURL.message as string;
}

export async function getRandomDogImageByBreed(
  breed: string,
  subBreed: string | null,
) {
  let response: Response;
  if (subBreed)
    response = await fetch(
      "https://dog.ceo/api/breed/" + breed + "/" + subBreed + "/images/random",
    );
  else
    response = await fetch(
      "https://dog.ceo/api/breed/" + breed + "/images/random",
    );
  const imageURL = await response.json();
  return imageURL.message as string;
}
