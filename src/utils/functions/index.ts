export const checkInvalidValuesFromEnum = (
  obj: any,
  target: string,
): boolean => {
  return Object.values(obj).includes(target) ? false : true;
};
