export default async function getBreeds() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const breedsList = await response.json();

  return breedsList.message;
}
