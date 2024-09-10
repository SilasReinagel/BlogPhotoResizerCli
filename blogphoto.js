#!/usr/bin/env node
// @ts-check

import { program } from 'commander';
/** @type {import('sharp')} */
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import clipboard from 'clipboardy';
import fetch from 'node-fetch';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
const ACCEPT_HEADER = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
const ACCEPT_LANGUAGE = 'en-US,en;q=0.9';
const CACHE_CONTROL = 'max-age=0';
const SEC_FETCH_DEST = 'document';
const SEC_FETCH_MODE = 'navigate';
const SEC_FETCH_SITE = 'none';
const SEC_FETCH_USER = '?1';

program
  .version('1.0.0')
  .requiredOption('-i, --input <path>', 'Input path of the local image file or URL')
  .option('-o, --output <path>', 'Output directory (default: ~/photos)')
  .parse(process.argv);

const options = program.opts();

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': ACCEPT_HEADER,
      'Accept-Language': ACCEPT_LANGUAGE,
      'Cache-Control': CACHE_CONTROL,
      'Sec-Fetch-Dest': SEC_FETCH_DEST,
      'Sec-Fetch-Mode': SEC_FETCH_MODE,
      'Sec-Fetch-Site': SEC_FETCH_SITE,
      'Sec-Fetch-User': SEC_FETCH_USER,
      'Upgrade-Insecure-Requests': '1',
      'Referer': 'https://www.google.com/',
    },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
  const buffer = await response.buffer();
  const tempPath = path.join(os.tmpdir(), `blogphoto_${Date.now()}.tmp`);
  await fs.writeFile(tempPath, buffer);
  return tempPath;
}

async function processImage(inputPath, outputDir) {
  try {
    let localInputPath = inputPath;

    // If input is a URL, download it first
    if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
      console.log('Downloading image...');
      localInputPath = await downloadImage(inputPath);
      console.log('Image downloaded successfully.');
    }

    // Verify that the input file exists
    await fs.access(localInputPath);

    // Generate output filename and path
    const timestamp = Date.now();
    const outputFilename = `${timestamp}.jpg`;
    const outputPath = path.join(outputDir, outputFilename);

    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Process the image using Sharp
    console.log('Processing image...');
    await sharp(localInputPath)
      .resize(1400, null, { fit: 'inside' })
      .resize(1400, 700, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // Output the file path and copy to clipboard
    console.log(`Image saved to: ${outputPath}`);
    await clipboard.write(outputPath);
    console.log('File path copied to clipboard.');

    // Clean up temporary file if it was created
    if (localInputPath !== inputPath) {
      await fs.unlink(localInputPath);
    }

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