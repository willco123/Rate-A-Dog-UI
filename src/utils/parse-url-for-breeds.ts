export default function parseUrlForBreeds(url: string) {
  const urlString = url.split("/");
  const breedTextInUrl = urlString.findIndex((element) => {
    return element == "breeds";
  });
  const breedInUrl = urlString[breedTextInUrl + 1];
  const [breed, subBreed] = breedInUrl.split("-");
  return [breed, subBreed];
}
