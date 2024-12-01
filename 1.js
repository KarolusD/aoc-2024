import { readFileSync } from "node:fs";

function day1() {
  const input = readFileSync("1.txt", "utf-8");
  const left = [];
  const right = [];

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      let distances = line.split("   ");
      left.push(Number(distances[0]));
      right.push(Number(distances[1]));
    });

  const distance = totalDistance(left.slice(), right.slice());
  const similarity = countSimilarityScore(left, right);

  return { distance, similarity };
}

function totalDistance(left, right, total = 0) {
  if (left.length === 0 || right.length === 0) {
    return total;
  }

  const ls = findSmallest(left);
  const rs = findSmallest(right);
  const diff = Math.abs(ls.value - rs.value);

  left.splice(ls.pos, 1);
  right.splice(rs.pos, 1);

  return totalDistance(left, right, total + diff);
}

function countSimilarityScore(left, right) {
  let total = 0;

  left.forEach((l) => {
    let times = 0;
    right.forEach((r) => {
      if (l === r) {
        times++;
      }
    });
    total += l * times;
  });
  return total;
}

// returns value and the position of smallest number in the array
function findSmallest(list) {
  if (list.length === 0) {
    console.log("List is empty");
    return 0;
  }

  return list.reduce(
    (acc, curr, idx) => {
      if (curr < acc.value) {
        return { value: curr, pos: idx };
      }
      return acc;
    },
    { value: list[0], pos: 0 },
  );
}

console.log(day1());
