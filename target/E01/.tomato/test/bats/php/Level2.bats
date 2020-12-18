expectedOutput=".tomato/output/convert_2.txt"
target="src/convert_2.php"
command="php $target"

@test "check if '$target' exists" {
    [[ -f $target ]]
}

@test "execute '$command' should give 0 as exit status" {
    run $command
    [ "$status" -eq 0 ]
}

@test "check '$command' produces expected output" {
    diff $expectedOutput <( $command )
}
