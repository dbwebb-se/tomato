<?php
$goldCoins = 150000;
$time = 4;
$interest = 2;
$result = $goldCoins;

for ($i = 0; $i < $time; $i++) {
    $goldCoins = ($result * $interest) / 100;
    $result += $goldCoins;
}

echo "Result\n";
echo intval($result) . "\n";
