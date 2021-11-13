export const imgNameTypeCrop = (fileName: string): string => {
  const types = ["jpg", "jpeg", "png", "webp", "heic", "heif"];
  let res = "";
  types.forEach((type) =>
    fileName.indexOf(type) !== -1
      ? (res = fileName.substring(0, fileName.length - type.length - 1))
      : null
  );
  return res;
};
