/**
 * check if num : number is a digit [0,...9] => return boolean
 */
var isDigit = function (num) {
    return num >= 0 && num <= 9;
};
/**
 * check if digit Array
 */
var isDigitArray = function (numArr) {
    for (var i = 0; i < numArr.length; i++) {
        if (!isDigit(numArr[i]))
            return false;
    }
    return true;
};
/**
 *
 * Your mission is to write an increment function that adds 1 to the input Array<number>
 * and returns the incremented Array<number>
 *
 * */
var increment = function (num) {
    if (num.length < 1) {
        throw new Error("Only array with at least one value");
    }
    if (!isDigitArray(num)) {
        throw new Error("Only Digit Array");
    }
    //tab size
    var size = num.length - 1;
    //add + 1 last case
    num[size]++;
    //if last case isDigit return TAB
    if (!isDigit(num[size])) {
        //tant que i >= 0 => decremente de 1
        for (var i = size; i >= 0; i--) {
            if (!isDigit(num[i])) {
                //if none Digit ===> = 10, on passe à 0
                num[i] = 0;
                if (i === 0) {
                    //si i  vaut 0 => ajoute une case au tableau avec la valuer 1
                    num.unshift(1);
                    break;
                }
                else {
                    //i sup à 0 => ajoute 1 à la valeur de la case d'avant
                    num[i - 1] += 1;
                    //on repart de size + 1 => car ds la boucle i--
                    i = num.length;
                }
            }
        }
    }
    return num;
};
var main = function () {
    try {
        console.log("Expected : [1,2,5] | Result : " + increment([1, 2, 4]));
        console.log("Expected : [2, 0, 0, 0] | Result : " + increment([1, 9, 9, 9]));
        console.log("Expected : [3, 0, 0, 0] | Result : " + increment([2, 9, 9, 9]));
        console.log("Expected : [1, 9, 9, 9] | Result : " + increment([1, 9, 9, 8]));
        console.log("Expected : [9, 6, 8] | Result : " + increment([9, 6, 7]));
        console.log("Expected : [2] | Result : " + increment([1]));
        console.log("Expected : [9, 4] | Result : " + increment([9, 3]));
        console.log("Expected : [5] | Result : " + increment([4]));
        console.log("Expected : [1, 0] | Result : " + increment([9]));
        console.log("Expected : [1, 0, 0] | Result : " + increment([9, 9]));
        console.log("Expected : [1, 0, 0, 0] | Result : " + increment([9, 9, 9]));
    }
    catch (error) {
        console.error(error.message);
    }
};
main();
