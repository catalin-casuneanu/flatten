"use strict";
console.clear();

const jsonu = {
  automobil: {
    benzina: {
      marca: "dacia",
      anul: "2022",
    },
    diesel: {
      marca: "audi",
      anul: "2022",
    },
    electric: {
      marca: "tesla",
      anul: "2022",
    },
  },
  bicicleta: "pegas",
  role: {
    inline: {
      "de viteza": {
        marca: "Rollerblades",
      },
    },
  },
};

/**
 * Flatten the Json
 * @param obj
 * @param res
 * @param extraKey
 */
const flatten = (obj = {}, res = {}, extraKey = "") => {
  for (const key in obj) {
    if (typeof obj[key] !== "object") {
      res[extraKey + key] = obj[key];
    } else {
      flatten(obj[key], res, `${extraKey}${key.replaceAll(" ", "--")}__`);
    }
  }
  return res;
};

/**
 * Flatten the Json Rewritten
 * @param obj
 */
const flattenRewritten = (obj = {}) => {
  let res = {};
  for (let key in obj) {
    if (typeof obj[key] !== "object") {
      res[key] = obj[key];
    } else {
      const temp = flatten(obj[key]);
      for (const nestedKey in temp) {
        res[key + "__" + nestedKey.replaceAll(" ", "--")] = temp[nestedKey];
      }
    }
  }
  return res;
};

/**
 * Benchmark
 * @param func
 * @param input
 * @param iterations
 * @returns {number}
 */
const bench = (func, input, iterations) => {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    func(input);
  }
  const finish = performance.now();
  return `${finish - start} milliseconds`;
};

console.log(flatten(jsonu));
console.log(flattenRewritten(jsonu));
console.log("Flatten " + bench(flatten, jsonu, 1000));
console.log("Flatten Rewritten " + bench(flattenRewritten, jsonu, 1000));
