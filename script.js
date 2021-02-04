/**
 * Adds numbers and returns sum (separated by a comma or custom delimiters).
 * Custom delimiter format: “//[delimiter]\n[delimiter separated numbers]”
 * Multiple custom delimiters separated by commas.
 *
 * @param { string } numbers    List of numbers separated by commas or custom delimiter(s).
 * @returns { int } Sum of all numbers.
 */
const add = function (numbers) {
  // check for valid inputs
  if (numbers == null || typeof numbers !== "string") {
    return 0;
  }

  let sum = 0;
  let validInput = true;
  let numberList = splitOnDelimiter(numbers, ",");

  // loop through each number and append to sum if valid
  numberList.forEach((item) => {
    let num;

    try {
      num = parseInt(item.trim());

      // add to sum, when num between 0 and 1000
      if (num < 0) {
        validInput = false;
        throw new RangeError(`Negatives not allowed: ${num}`);
      } else if (Number.isInteger(num) && num <= 1000) {
        sum += num;
      }
    } catch (e) {
      console.error(e);
    }
  });

  if (!validInput) {
    return 0;
  }

  return sum;
};

/**
 * Splits a string of numbers based on a delimiter.
 * Custom delimiter format: “//[delimiter]\n[delimiter separated numbers]”
 * Multiple custom delimiters separated by commas.
 *
 * @param { string} numbers     String of numbers to split
 * @param { string } aDelimiter A default delimiter
 */
const splitOnDelimiter = function (numbers, aDelimiter) {
  // check for custom delimiter(s)
  if (numbers.slice(0, 2) == "//") {
    //parse delimiter(s)
    aDelimiter = numbers.split("\n")[0].toString();
    aDelimiter = aDelimiter.substr(2);

    // use regEx for multiple delimiters
    if (aDelimiter.includes(",")) {
      aDelimiter = aDelimiter.split(",");
      aDelimiter = new RegExp("[" + aDelimiter.join("") + "]", "g");
    }
  }
  // split numbers based on delimiter
  return numbers.split(aDelimiter);
};

const tests = [
  ["", 0],
  [" ", 0],
  [",", 0],
  ["1,,2", 3],

  ["1", 1],
  ["1,2,3", 6],
  ["10 , 200", 210],

  ["1\n, 2", 3],
  ["1\n,2,3", 6],
  ["1\n, \n10, \n500", 511],

  ["//x/\n1x/2", 3],
  ["//;\n1;3;4", 8],
  ["//xyz!?@#$%^&*\n100 xyz!?@#$%^&* 20", 120],
  ["//$\n1$2$3", 6],
  ["//@\n2@3@8", 13],

  ["//@\n-2@3@8", 0],
  ["1,-10", 0],

  ["//$,@\n1$2@3", 6],

  ["//$,@xc,#..\n1$2@xc3#..100", 106],
  ["//$dd,@xc,#..\n1@xc2$ddxc3#..200", 206],
];

/**
 * Returns a test function that can check if returned value is the expected value.
 * @param { function } callback A callback function to call in the test
 * @param { string } input The parameter to be called in the callback function
 * @param { * } expected The value to compare with
 */
const createTest = function (callback, input, expected) {
  return function (input, expected) {
    let answer = callback(input);

    if (answer !== expected) {
      throw `add("${input}"): Expected ${expected}, but got ${answer}`;
    }
  };
};

const addTest = createTest(add);

function runTests(allTests, callback) {
  let success = allTests.length;

  console.log("-----------RUNNING TESTS-----------");
  // run each test
  allTests.forEach((testCase) => {
    try {
      callback(testCase[0], testCase[1]);
    } catch (e) {
      console.error(e);
      success--;
    }
  });

  console.log(`${success} of ${allTests.length} tests ran successfully.`);
}

runTests(tests, addTest);
