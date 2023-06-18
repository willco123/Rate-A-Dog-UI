declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}
