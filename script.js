/**
 * Adds numbers and returns sum (separated by a comma or custom delimiters).
 * Custom delimiter format: “//[delimiter]\n[delimiter separated numbers]”
 * Multiple custom delimiters separated by commas.
 *
 * @param { string } numbers    List of numbers separated by commas or custom delimiter(s).
 * @returns { int } Sum of all numbers.
 */
function add(numbers) {
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
        throw `Negatives not allowed: ${num}`;
      } else {
        if (Number.isInteger(num) && num <= 1000) {
          sum += num;
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  if (!validInput) {
    return 0;
  }

  return sum;
}

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

// Create tests
const addTest = function (input, expected) {
  let answer = add(input);

  if (answer !== expected) {
    console.log(`add("${input}"): Expected ${expected}, but got ${answer}`);
  }
};

// Unit Tests
(() => {
  // special cases
  addTest("", 0);
  addTest(" ", 0);
  addTest(",", 0);
  addTest("1,,2", 3);

  // simple addition
  addTest("1", 1);
  addTest("1,2", 3);
  addTest("1,2,3", 6);
  addTest("10 , 20", 30);

  // new lines '\n'
  addTest("1\n, 2", 3);
  addTest("1\n,2,3", 6);
  addTest("1\n, \n10, \n500", 511);

  // custom delimiter
  addTest("//x/\n1x/2", 3);
  addTest("//;\n1;3;4", 8);
  addTest("//xyz!?@#$%^&*\n100 xyz!?@#$%^&* 20", 120);
  addTest("//$\n1$2$3", 6);
  addTest("//@\n2@3@8", 13);

  // negative numbers
  addTest("//@\n-2@3@8", 0);
  addTest("1,-10", 0);

  // multiple delimiters
  addTest("//$,@\n1$2@3", 6);

  // multiple delimiters of arbitrary length
  addTest("//$,@xc,#..\n1$2@xc3#..100", 106);
  addTest("//$dd,@xc,#..\n1@xc2$ddxc3#..200", 206);
})();
