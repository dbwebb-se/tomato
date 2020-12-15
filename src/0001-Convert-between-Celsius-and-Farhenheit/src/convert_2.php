<?php

$celsiusLow = 0;
$celsiusHigh = 100;
$step = 10;


echo "|  C  |  F  |\n";
echo "|-----|-----|\n";

$celsius = $celsiusLow;
do {
    $farenheit = $celsius * 9 / 5 + 32;
    printf("| %3d | %3d |\n", $celsius, $farenheit);
    $celsius += $step;
}
while ($celsius <= $celsiusHigh);
