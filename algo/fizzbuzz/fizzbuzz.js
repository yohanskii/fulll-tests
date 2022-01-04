var isMultipleOf = function (num, multiple) {
    return num % multiple === 0;
};
var fizzBuzz = function (num) {
    if (typeof num !== "number") {
        throw new Error("Only numbers");
    }
    if (num < 1) {
        throw new Error("Only numbers between 1 and N");
    }
    var result = "";
    if (isMultipleOf(num, 3)) {
        result = "Fizz";
    }
    if (isMultipleOf(num, 5)) {
        result += "Buzz";
    }
    //if result (multipleOf 3 and/or 5) return result string or number
    return result ? result : num;
};
var main = function () {
    try {
        console.log("Expect => FizzBuzz, result => ", fizzBuzz(15));
        console.log("Expect => Fizz, result => ", fizzBuzz(9));
        console.log("Expect => Buzz, result => ", fizzBuzz(10));
        console.log("Expect => Fizz, result => ", fizzBuzz(9));
        console.log("Expect => 11, result => ", fizzBuzz(11));
        console.log("Expect => FizzBuzz, result => ", fizzBuzz(135));
        console.log("Expect => error: Only numbers between 1 and N, result => ", fizzBuzz(0));
        // console.log("Expect => error: Only numbers, result => ", fizzBuzz("hey"));
    }
    catch (error) {
        console.error(error.message);
    }
};
main();
