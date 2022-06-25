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
