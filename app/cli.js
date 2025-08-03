
const fs = require('fs');
const path = require('path');
const { createStandalonePlugin } = require(path.join(__dirname, 'standalone.js'));
const server = require(path.join(__dirname, 'server.js'));

const main = () => {
  const args = process.argv.slice(2);
  const markdownFilePath = args[0];

  if (!markdownFilePath) {
    console.error('Please provide a path to a markdown file.');
    process.exit(1);
  }

  if (!fs.existsSync(markdownFilePath)) {
    console.error(`File not found: ${markdownFilePath}`);
    process.exit(1);
  }

  const absolutePath = path.resolve(markdownFilePath);
  const plugin = createStandalonePlugin(absolutePath);
  server.run(plugin);
};

main();
