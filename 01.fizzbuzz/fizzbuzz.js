const createRangedNumbers = (startNum, endNum) => {
  return Array(endNum - startNum + 1).fill().map((_, i) => i + startNum);
}

const numbers = createRangedNumbers(1, 20)

numbers.forEach((number) => {
  if (number % 15 === 0) {
    console.log("FizzBuzz");
  } else if (number % 5 === 0) {
    console.log("Buzz");
  } else if (number % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(number);
  }
});
