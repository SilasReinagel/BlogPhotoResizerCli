# BlogPhoto CLI Tool

BlogPhoto is a powerful command-line tool designed to streamline image processing for blog posts and social media content. It takes a local image file or a web URL, resizes it to fit within 1400px width, center crops it to 1400x700px, and saves it as a JPEG file with 80% quality and a timestamp filename.

## Features

- Process local image files or images from web URLs
- Resize images to fit within 1400px width
- Center crop images to 1400x700px aspect ratio
- Convert images to JPEG format with 80% quality
- Automatically generate unique filenames using timestamps
- Copy the output file path to clipboard for easy use

...

### Examples

1. Process an image with default settings:
   ```
   blogphoto -i ~/Downloads/my-image.png
   ```

2. Process an image and save to a custom directory:
   ```
   blogphoto -i ~/Downloads/my-image.png -o ~/Documents/blog-images
   ```

...

## Use Cases

1. **Blog Post Featured Images**: Quickly prepare images for blog post headers or featured images, ensuring a consistent size and aspect ratio across your blog.

2. **Social Media Posts**: Create perfectly sized images for social media platforms that prefer a 2:1 aspect ratio, such as Twitter card images or Facebook link previews.

3. **E-commerce Product Images**: Standardize product images for your e-commerce website, maintaining a consistent look and feel across your product catalog.

4. **Email Newsletter Headers**: Prepare eye-catching header images for your email newsletters that will display well across various email clients.

5. **Batch Processing**: Use this tool in combination with shell scripts to process multiple images in bulk, saving time on repetitive image editing tasks.

6. **Content Management System Integration**: Integrate this tool into your CMS workflow to automatically process and resize images upon upload.

...

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/blogphoto.git
   cd blogphoto
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make the command globally available:
   ```
   npm link
   ```

## Usage

Basic usage:
```
blogphoto --input path/to/image.jpg
```

Options:
- `--input`: Path to the input image file
- `--output`: Path to the output directory (default: ~/photos)

