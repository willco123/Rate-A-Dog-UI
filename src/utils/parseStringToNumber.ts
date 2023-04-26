export default function parseStringToNumber(input: string | undefined): number {
  if (input === undefined) return 0;
  return parseInt(input, 10);
}
