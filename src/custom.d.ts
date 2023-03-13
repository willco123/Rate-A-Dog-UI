declare module "*.svg" {
  const content: any;
  export default content;
}
// declare module "*.css";

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
i;

// {
//   const classes: { [key: string]: string };
//   export default classes;
// }
