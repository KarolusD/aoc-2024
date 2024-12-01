import { readFileSync } from "node:fs";

function day1() {
  const input = readFileSync("1.input", "utf-8");
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

  const distance = totalDistance(left.sort(), right.sort());
  const similarity = countSimilarityScore(left.sort(), right.sort());

  return { distance, similarity };
}

function totalDistance(left, right) {
  return left.map((l, idx) => Math.abs(l - right[idx])).reduce((a, b) => a + b);

  // Without Sorting 🤷
  // if (left.length === 0 || right.length === 0) {
  //   return total;
  // }
  //
  // const ls = findSmallest(left);
  // const rs = findSmallest(right);
  // left.splice(ls.pos, 1);
  // right.splice(rs.pos, 1);

  // return totalDistance(left, right, total + diff);
}

function countSimilarityScore(left, right) {
  return left
    .map((l) => right.filter((r) => r === l).length * l)
    .reduce((a, b) => a + b);
}

// returns value and the position of smallest number in the array
// function findSmallest(list) {
//   if (list.length === 0) {
//     console.log("List is empty");
//     return 0;
//   }
//
//   return list.reduce(
//     (acc, curr, idx) => {
//       if (curr < acc.value) {
//         return { value: curr, pos: idx };
//       }
//       return acc;
//     },
//     { value: list[0], pos: 0 },
//   );
// }

console.log(day1());
