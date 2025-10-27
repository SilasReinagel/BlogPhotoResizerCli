# BlogPhoto

BlogPhoto is a command-line tool designed to quickly resize and crop images for blog posts and social media. It automatically resizes images to a width of 1400 pixels and crops them to a 2:1 aspect ratio, which is ideal for many blog platforms and social media headers.

## Features

- Resize images to 1400 pixels wide
- Crop images to a 2:1 aspect ratio (1400x700 pixels)
- Save output as JPEG with 80% quality
- Automatically generate output filenames with timestamps
- Copy the output file path to clipboard for easy use

## Installation

1. Ensure you have Node.js (version 14 or later) installed on your system.

2. Clone this repository:
   ```
   git clone https://github.com/yourusername/blogphoto.git
   cd blogphoto
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Install the tool globally:
   ```
   npm install -g .
   ```

## Usage

Once installed, you can use BlogPhoto from anywhere in your terminal. Here's an example of how to use it:

```
> blogphoto -i './_testImages/0.png'
```
   
This command will take the image located at `./_testImages/0.png`, resize it to 1400 pixels wide, crop it to a 2:1 aspect ratio (1400x700 pixels), save the output as a JPEG with 80% quality, and copy the output file path to the clipboard for easy use.


