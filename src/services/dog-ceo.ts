export type Breeds = {
  [key: string]: (string | null)[];
};

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
