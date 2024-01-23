export const logicTest2 = (text) => {
  const specialCharacters = /[`!@#$%^&*()_+\=\[\]{};':"\\|<>\/~]/;

  let temp = [];
  text?.split(" ").forEach((str) => {
    if (!specialCharacters.test(str)) {
      temp.push(str);
    }
  });

  return temp?.length;
};
