import * as StringUtilities from "./utilities/stringUtilities";
import * as NumberUtilities from "./utilities/numberUtilities";
// hi;  //if this line is enabled, the command type-check should report error
const sGreeting = "hello"; //if this line reports error, that means eslint works
const sConvertedGreeding = 
StringUtilities.toUpperCase(sGreeting); //if this line reports error, that means eslint works
// eslint-disable-next-line no-console
console.log(sConvertedGreeding + " world"); //if this line reports warnning, that means eslint works
const nResult = NumberUtilities.add(2, 5);
// eslint-disable-next-line no-console
console.log(nResult); //if this line reports warnning, that means eslint works
