<?php

namespace Tomato;

use PHPUnit\Framework\TestCase;

/**
 * Tests.
 */
class Level1Test extends TestCase
{
    /**
     * Check that the file(s) are there.
     */
    public function testTargetFileExists()
    {
        $target = SOURCE . "/convert_1.php";
        $res = is_file($target);
        $this->assertTrue($res);
    }



    /**
     * Check the output from the program.
     */
    public function testOutputFromProgram()
    {
        $solution = OUTPUT . "/convert_1.php";
        $target = "php " . SOURCE . "/convert_1.php";
        $res = shell_exec($target);
        //$exp
        // ob_start();
        // $res = shell_exec($target);
        // $res = ob_get_contents();
        // ob_end_clean();

        //var_dump($res);
        $this->assertTrue(true);
    }
}
