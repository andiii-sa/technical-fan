export const logicTest1 = (arr) => {
  let temp = [];
  let total = 0;

  arr.forEach((el) => {
    const find = temp?.some((s) => s === el);
    if (!find) {
      const filter = arr?.filter((f) => f === el);
      const sum = Math.floor(filter?.length / 2);

      if (sum >= 1) {
        temp.push(el);
        total = total + sum;
      }
    }
  });
  return total;
};
