import toStringLowerCase from "./to-string-lower-case.js";

export default function filterArrayOfObjects<T extends Object>(
  unfilteredArray: Array<T>,
  filterValue: string,
) {
  const filteredShallowArray = unfilteredArray.filter((element) => {
    const elementValues = Object.values(element);
    const elementValuesSanitised = toStringLowerCase(elementValues);
    const filterValueLowerCase = filterValue.toLowerCase();
    let isFound: boolean = false;

    //sub-arrays
    for (let item of elementValuesSanitised) {
      if (Array.isArray(item)) {
        isFound = item.indexOf(filterValueLowerCase) > -1 ? true : false;
        if (isFound) return true;
      }
      if (typeof item === "string") {
        isFound = item.indexOf(filterValueLowerCase) > -1 ? true : false;
        if (isFound) return true;
      }
    }
    return false;
  });

  const filteredArray = [...filteredShallowArray];
  return filteredArray;
}

// for (let item of elementValuesSanitised) {
//   let isFound: boolean = false;

//   if (Array.isArray(item)) {
//     for (let subArrayItem of item) {
//       if (subArrayItem != null)
//         isFound =
//           subArrayItem.indexOf(filterValueLowerCase) > -1 ? true : false;
//       if (isFound) return true;
//     }
//   }
//   if (item)
//     isFound = item.indexOf(filterValueLowerCase) > -1 ? true : false;
//   if (isFound) return true;
// }
