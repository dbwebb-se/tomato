import chai from 'chai';
import chaifs from 'chai-fs';
import * as fs from 'fs';
import chaiExecAsync from '@jsdevtools/chai-exec';

import {OUTPUT, SOURCE} from './config.mjs';

const expect = chai.expect;

chai.use(chaifs);
chai.use(chaiExecAsync);

describe('Testsuite for Level 1', () => {
    let sourceFile;
    let outputFile;
    let outputFileContent;

    describe("Convert 1", () => {
        sourceFile = `${SOURCE}/convert_1.js`;
        outputFile = `${OUTPUT}/convert_1.js`;

        /**
        * Runs before all tests in this block.
        */
        before(function(done) {
            fs.readFile(outputFile, 'utf8', function(err, fileContents) {
                if (err) throw err;
                outputFileContent = fileContents;
                done();
            });
        })

        /**
        * Check that the file(s) are there.
        */
        it('The file is present', (done) => {
            expect(sourceFile).to.be.a.file("No such file.");
            done();
        });

        /**
        * Compare the output.
        */
        it("should match output", async () => {
            let srcExec = await chaiExecAsync(`node ${sourceFile}`);
            expect(srcExec).stdout.to.contain(outputFileContent);
        });
    });

    describe("Convert 2", () => {
        sourceFile = `${SOURCE}/convert_2.js`;
        outputFile = `${OUTPUT}/convert_2.js`;

        /**
        * Runs before all tests in this block.
        */
        before(function(done) {
            fs.readFile(outputFile, 'utf8', function(err, fileContents) {
                if (err) throw err;
                outputFileContent = fileContents;
                done();
            });
        })

        /**
        * Check that the file(s) are there.
        */
        it('The file is present', (done) => {
            expect(sourceFile).to.be.a.file("No such file.");
            done();
        });

        /**
        * Compare the output.
        */
        it("should match output", async () => {
            let srcExec = await chaiExecAsync(`node ${sourceFile}`);
            expect(srcExec).stdout.to.contain(outputFileContent);
        });
    });
});
