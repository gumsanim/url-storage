/* 특정 정규식과 문자열을 적용해 boolean 값을 내어주는 함수입니다.*/

export const regexValidator = (regex: RegExp, target: string): boolean => {
  return regex.test(target);
};
