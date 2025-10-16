# Universal File Viewer

A React application that can display different file formats (PDF, Image, DOCX, Excel) using a single, reusable component.

## File URLs

- **PDF**: `https://ik.imagekit.io/vampire/drylab.pdf?updatedAt=1760596102717`
- **Image**: `https://ik.imagekit.io/vampire/default-image.jpg?updatedAt=1712906572620`
- **DOCX**: `https://ik.imagekit.io/vampire/file-sample_100kB.doc?updatedAt=1760596220502`
- **Excel**: `https://ik.imagekit.io/vampire/file_example_XLS_10.xls?updatedAt=1760596261776`

## Setup and Usage

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

## CORS Issues

The file URLs used in this project are hosted on ImageKit, which has CORS enabled. However, if you use your own file URLs, you may encounter CORS (Cross-Origin Resource Sharing) issues. If you see errors related to CORS, you may need to configure your server to allow requests from the domain where this application is hosted, or use a CORS proxy.