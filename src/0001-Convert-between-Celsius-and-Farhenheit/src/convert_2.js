let celsiusLow = 0;
let celsiusHigh = 100;
let step = 10;


console.log(`|  C  |  F  |`);
console.log(`|-----|-----|`);

let celsius = celsiusLow;

while (celsius <= celsiusHigh) {
    let cel, far;

    farenheit = celsius * 9 / 5 + 32;

    cel = celsius.toString().padStart(3, " ");
    far = farenheit.toString().padStart(3, " ");

    console.log(`| ${cel} | ${far} |`);
    celsius += step;
}
