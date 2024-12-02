import { readFileSync } from "node:fs";

function day2() {
  const input = readFileSync("day2.input", "utf-8");
  let safeReports = 0;

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const nums = line.split(" ").map(Number);

      if (checkSafeSequence(nums)) {
        safeReports++;
      }
    });

  return safeReports;
}

function day2_2() {
  const input = readFileSync("day2.input", "utf-8");
  let safeReports = 0;

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const nums = line.split(" ").map(Number);

      if (checkSafeSequence(nums).isCorrect) {
        safeReports++;
        console.log(line);
      } else {
        for (let i = 0; i < nums.length; i++) {
          let newNums = nums.slice(0, i).concat(nums.slice(i + 1)); // removes i'th element
          if (checkSafeSequence(newNums).isCorrect) {
            safeReports++;
            console.log(line);
            break;
          }
        }
      }
    });
  return safeReports;
}

function checkSafeSequence(nums) {
  if (nums.length < 2) return { isCorrect: true };

  let isIncreasing = nums[0] < nums[1];
  for (let i = 0; i < nums.length - 1; i++) {
    let curr = nums[i];
    let next = nums[i + 1];
    let diff = next - curr;
    if (
      Math.abs(diff) > 3 ||
      curr === next ||
      (isIncreasing && diff < 0) ||
      (!isIncreasing && diff > 0)
    ) {
      return { isCorrect: false, idx: i };
    }
  }
  return { isCorrect: true };
}

function day2_2_optmized() {
  const input = readFileSync("day2.test", "utf-8");
  let safeReports = 0;

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const nums = line.split(" ").map(Number);

      const seq = checkSafeSequence(nums);
      if (seq.isCorrect) {
        safeReports++;
      } else {
        const u = nums.slice(0, seq.idx - 1).concat(nums.slice(seq.idx));
        const s = nums.slice(0, seq.idx).concat(nums.slice(seq.idx + 1));
        const t = nums.slice(0, seq.idx + 1).concat(nums.slice(seq.idx + 2));

        if (
          checkSafeSequence(s).isCorrect ||
          checkSafeSequence(t).isCorrect ||
          checkSafeSequence(u).isCorrect
        ) {
          safeReports++;
        }
      }
    });
  return safeReports;
}

console.log(day2());
console.log(day2_2());
console.log(day2_2_optmized());
