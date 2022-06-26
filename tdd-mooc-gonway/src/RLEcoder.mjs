export function decode(pattern) {
  const decodedPattern = [];
  const arr = pattern.split("");
  let count = 1;
  arr.forEach((c) => {
    if (!isNaN(c)) count = Number(c);
    else {
      while (count > 0) {
        count--;
        if (count > 1) arr.push(count);
        decodedPattern.push(c);
      }
      count = 1;
    }
  });
  return decodedPattern.join("");
}

export function encode(pattern) {
  const arr = pattern.split("");
  let count = 0;
  const encodedPattern = arr.reduce((acc, curr) => {
    const prev = acc.pop();
    if (prev === curr) {
      count++;
      return [...acc, prev];
    } else {
      if (count > 1) {
        const c = count;
        count = 1;
        return [...acc, c, prev, curr];
      }
      count = 1;
      return [...acc, prev, curr];
    }
  }, []);
  return encodedPattern.join("");
}
