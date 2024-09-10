#!/usr/bin/env node
// @ts-check

import { program } from 'commander';
/** @type {import('sharp')} */
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import clipboard from 'clipboardy';

program
  .version('1.0.0')
  .requiredOption('-i, --input <path>', 'Input path of the local image file')
  .option('-o, --output <path>', 'Output directory (default: ~/photos)')
  .parse(process.argv);

const options = program.opts();

async function processImage(inputPath, outputDir) {
  try {
    // Verify that the input file exists
    await fs.access(inputPath);

    // Generate output filename and path
    const timestamp = Date.now();
    const outputFilename = `${timestamp}.jpg`;
    const outputPath = path.join(outputDir, outputFilename);

    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Process the image using Sharp
    console.log('Processing image...');
    await sharp(inputPath)
      .resize(1400, null, { fit: 'inside' })
      .resize(1400, 700, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // Output the file path and copy to clipboard
    console.log(`Image saved to: ${outputPath}`);
    await clipboard.write(outputPath);
    console.log('File path copied to clipboard.');

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Error: Input file not found.');
    } else {
      console.error('Error processing image:', error.message);
    }
    process.exit(1);
  }
}

const outputDir = options.output || path.join(os.homedir(), 'photos');
processImage(options.input, outputDir);