#!/usr/bin/env node
// @ts-check

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import fs from 'fs';
import clipboardy from 'clipboardy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .version('1.0.0')
  .option('-i, --input <path>', 'Input image file path')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Error: Input file path is required. Use -i or --input option.');
  process.exit(1);
}

const inputPath = path.resolve(options.input);
const outputDir = path.join(__dirname, '_outputs');
const timestamp = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0];
const outputFilename = `${timestamp}.jpg`;
const outputPath = path.join(outputDir, outputFilename);

// Ensure _outputs directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImage(input, output) {
  try {
    await sharp(input)
      .resize(1400, null, { fit: 'inside' })
      .resize(1400, 700, { fit: 'cover' })
      .jpeg({ quality: 80 }) // Set JPEG quality to 80
      .toFile(output);
    
    console.log(`Image processed successfully. Output saved to: ${output}`);
    
    // Copy the output file path to clipboard
    await clipboardy.write(output);
    console.log('Output file path copied to clipboard.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage(inputPath, outputPath);