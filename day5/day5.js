import { readFileSync } from "node:fs";

function day5() {
  const input = readFileSync("day5.input", "utf-8");
  const [firstBlock, secondBlock] = input.trim().split("\n\n");

  const rules = firstBlock.split("\n");
  const lines = secondBlock.split("\n");

  // 1. for every letter I check every rule there is
  // 2. if the rule consist current letter I am interested in further checking
  // 3. Check if current letter is in after | before rule
  // 4. If it's before rule - I am checking if after rule letter does not exists before current letter
  // 5. If point 4 is met this means that the pages order is incorrect and not according to the rules

  let correctOnes = [];

  for (let l = 0; l < lines.length; l++) {
    const pages = lines[l].split(",");
    let isBefore = false;

    for (let i = 0; i < pages.length; i++) {
      const currentPage = pages[i];

      rules.forEach((rule) => {
        const [beforePageRule, afterPageRule] = rule.split("|");

        if (currentPage === beforePageRule) {
          for (let b = i - 1; b >= 0; b--) {
            const pageBefore = pages[b];
            if (pageBefore === afterPageRule && !isBefore) {
              // console.log({ currentPage, beforePageRule, afterPageRule });
              isBefore = true;
              break;
            }
          }
        }
      });
    }
    if (!isBefore) {
      correctOnes.push(pages);
    }
  }

  return correctOnes
    .map((c) => Number(c[Math.floor(c.length / 2)]))
    .reduce((a, b) => a + b, 0);
}

function day5_2() {
  const input = readFileSync("day5.input", "utf-8");
  const [firstBlock, secondBlock] = input.trim().split("\n\n");

  const rules = firstBlock.split("\n");
  const lines = secondBlock.split("\n");

  const incorrectPages = [];

  // 1. for every letter I check every rule there is
  // 2. if the rule consist current letter I am interested in further checking
  // 3. Check if current letter is in after | before rule
  // 4. If it's before rule - I am checking if after rule letter does not exists before current letter
  // 5. If point 4 is met this means that the pages order is incorrect and not according to the rules

  for (let l = 0; l < lines.length; l++) {
    const pages = lines[l].split(",");
    let incorrect = false;
    let swapped = false;

    do {
      swapped = false;

      for (let i = 0; i < pages.length; i++) {
        const currentPage = pages[i];

        rules.forEach((rule) => {
          const [beforePageRule, afterPageRule] = rule.split("|");

          if (currentPage === beforePageRule) {
            for (let b = i - 1; b >= 0; b--) {
              const pageBefore = pages[b];
              if (pageBefore === afterPageRule) {
                incorrect = true;
                // console.log({ currentPage, pageBefore, afterPageRule });
                // console.log(pages);
                [pages[b], pages[i]] = [pages[i], pages[b]];
                swapped = true;
                break;
                // console.log("---- UPDATE ----");
                // console.log(pages);
              }
            }
          }
        });
      }
    } while (swapped);
    incorrect && incorrectPages.push(pages);
  }

  console.log({ incorrectPages });
  return incorrectPages
    .map((c) => Number(c[Math.floor(c.length / 2)]))
    .reduce((a, b) => a + b, 0);
}

// console.log(day5());
console.log(day5_2());
