export const regexValidator = (regex: RegExp, target: string) => {
  return regex.test(target);
};
