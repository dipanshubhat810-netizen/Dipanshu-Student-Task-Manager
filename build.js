#!/usr/bin/env node
/**
 * Build step for the Student Task Manager.
 *
 * The application has no compilation step, so the build validates that the
 * runtime files and the static assets are present. It exits with code 1 if
 * any required file is missing, which fails the Jenkins Build stage.
 */

const fs = require("fs");
const path = require("path");

const requiredFiles = [
    "app.js",
    "package.json",
    "public/index.html",
    "public/style.css",
    "public/script.js"
];

console.log("Building Dipanshu Student Task Manager...");

let failed = false;

for (const file of requiredFiles) {

    const fullPath = path.join(__dirname, file);

    if (!fs.existsSync(fullPath)) {
        console.error(`BUILD FAILED: ${file} not found`);
        failed = true;
        continue;
    }

    const size = fs.statSync(fullPath).size;

    console.log(`BUILD OK: ${file} (${size} bytes)`);
}

if (failed) {
    process.exit(1);
}

console.log("Build completed successfully.");
