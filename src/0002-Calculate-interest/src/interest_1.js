let goldCoins = 150000,
    time = 4,
    interest = 2,
    result = goldCoins;

for (let i = 0; i < time; i++) {
    goldCoins = (result * interest) / 100;
    result += goldCoins;
}

console.log(`Result`);
console.log(`${parseInt(result)}`);
