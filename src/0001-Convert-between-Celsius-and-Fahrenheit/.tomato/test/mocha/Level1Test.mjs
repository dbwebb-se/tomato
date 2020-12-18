import chai from 'chai';
import chaifs from 'chai-fs';
import chaiFiles from 'chai-files';
import chaiExecAsync from '@jsdevtools/chai-exec';

import {OUTPUT, SOURCE} from './config.mjs';

chai.use(chaifs);
chai.use(chaiExecAsync);
chai.use(chaiFiles);

const file = chaiFiles.file;
const expect = chai.expect;

describe('Testsuite for Level 1', () => {
    let sourceFile;
    let outputFile;
    let outputFileContent;

    describe("Convert 1", () => {
        sourceFile = `${SOURCE}/convert_1.js`;
        outputFile = `${OUTPUT}/convert_1.txt`;

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
            expect(srcExec).stdout.to.equal(file(outputFile));
        });
    });

    describe("Convert 2", () => {
        sourceFile = `${SOURCE}/convert_2.js`;
        outputFile = `${OUTPUT}/convert_2.txt`;

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
            expect(srcExec).stdout.to.equal(file(outputFile));
        });
    });
});
