import * as fs from "fs";

export function sum(a, b) {
  return a + b;
}

const nine = 9;

export function multiplyByNine(path, number, date) {
  const result = number * nine * Math.floor(Math.random() * 2);
  const text = `Calculated: date\n result: ${number} times 9 = ${result}\n`;
  fs.writeFile(path, text, (err) => {
    if (err) throw err;
  });
  return result;
}
