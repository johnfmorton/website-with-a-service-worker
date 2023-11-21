const fs = require('fs');
const path = require('path');

const directory = 'web/'; // Directory where the service worker files are located

// Delete a specific file
function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${filePath}`);
  } catch {
    // console.error(`No file named ${filePath} to delete.`);
  }

}

// Delete the sw.js file, if present
deleteFile(path.join(directory, 'sw.js'));
// Delte the sw-test.js file, if present
deleteFile(path.join(directory, 'sw-test.js'));

console.log(`Cleaned old service worker files from the '${directory}' directory.`);
