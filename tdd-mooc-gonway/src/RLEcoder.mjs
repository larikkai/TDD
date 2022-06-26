export function decode(pattern) {
  const arr = pattern.split("");
  let count = 1;
  return arr
    .reduce((acc, curr) => {
      if (!isNaN(curr)) {
        count = Number(curr);
        return [...acc];
      }
      while (count > 1) {
        count--;
        acc = [...acc, curr];
      }
      return [...acc, curr];
    }, [])
    .join("");
}

export function encode(pattern) {
  const arr = pattern.split("");
  let count = 0;
  return arr
    .reduce((acc, curr) => {
      let c;
      const prev = acc.pop();
      if (prev === curr) {
        count++;
        return [...acc, prev];
      }
      if (count > 1) c = count;
      count = 1;
      return [...acc, c, prev, curr];
    }, [])
    .join("");
}
