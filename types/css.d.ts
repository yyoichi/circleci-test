declare module '*.css' {
  interface ClassNames {
    [key: string]: string;
  }
  const classNames: ClassNames;
  export default classNames;
}
