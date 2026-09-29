/**
 * Automated test script for the Student Task Manager.
 *
 * The Jenkins pipeline runs this script through `npm test`. If any test case
 * fails the script calls process.exit(1), Jenkins receives a non-zero exit
 * code and the Pipeline is marked as FAILURE.
 */

const fs = require('fs');

const tests = [
    'app.js',
    'package.json',
    'public/index.html'
];

console.log('Starting automated tests...');

for (const file of tests) {
    if (!fs.existsSync(file)) {
        console.error(`TEST FAILED: ${file} not found`);
        process.exit(1);
    }
    console.log(`TEST PASSED: ${file} exists`);
}

console.log('All automated tests passed.');
