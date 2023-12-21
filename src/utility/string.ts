export const convertUnicode = (input: string) => {
  return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a,b) =>
    String.fromCharCode(parseInt(b, 16)));
};
