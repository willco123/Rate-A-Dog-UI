type UnSanitisedData = Array<
  string | number | null | Array<string | number | null>
>;

type SanitisedData = Array<string | null | Array<string | null>>;

export default function toStringLowerCase(data: UnSanitisedData) {
  const dataToStringLowerCase: SanitisedData = data.map((element) => {
    if (typeof element === "string") return element.toLowerCase();
    if (typeof element === "number") return element.toString();

    if (Array.isArray(element)) {
      for (let i of element) {
        if (typeof i === "string") i.toLowerCase();
        if (typeof i === "number") i.toString();
      }
      return element as (string | null)[];
    }
    return element;
  });
  return dataToStringLowerCase;
}
