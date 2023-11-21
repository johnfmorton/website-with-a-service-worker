const fs = require('fs');
const path = require('path');

const directory = 'web/'; // Directory where the service worker files are located

// Delete a specific file
function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (err) {
    console.error(`Error deleting ${filePath}:`, err);
  }
}

// Delete the sw.js and sw.js.map files
deleteFile(path.join(directory, 'sw.js'));
// deleteFile(path.join(directory, 'sw.js.map'));

// Delete workbox-HASH.js and workbox-HASH.js.map files
fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${directory}:`, err);
    return;
  }

  files.forEach((file) => {
    if (/workbox-.*\.(js|js\.map)$/.test(file)) {
      deleteFile(path.join(directory, file));
    }
  });
});
