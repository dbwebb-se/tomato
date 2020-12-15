let celsiusLow = 0;
let celsiusHigh = 100;
let step = 10;


console.log(`|  C  |  F  |`);
console.log(`|-----|-----|`);

let celsius = celsiusLow;

while (celsius <= celsiusHigh) {
    farenheit = celsius * 9 / 5 + 32;
    console.log(`| ${celsius.toString().padStart(3, " ")} | ${farenheit.toString().padStart(3, " ")} |`);
    celsius += step;
}
