import * as StringUtilities from "./utilities/stringUtilities";
import * as NumberUtilities from "./utilities/numberUtilities";
// hi;  //if this line is enabled, the command type-check should report error
let sGreeting = "hello"; //if this line reports error, that means eslint works
let sConvertedGreeding = StringUtilities.toUpperCase(sGreeting); //if this line reports error, that means eslint works
console.log(sConvertedGreeding + " world"); //if this line reports warnning, that means eslint works
