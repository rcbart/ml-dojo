#!/usr/bin/env node
// Build dist/index.html from src/ + content/streams/ (MLDojo).
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

const manifest = JSON.parse(read('content/streams/manifest.json'));
const data = read('content/streams/_header.js')
  + manifest.map(f => read(path.join('content/streams', f))).join('\n')
  + read('content/streams/_footer.js');
const script = read('src/icons.js') + '\n' + read('src/app.js') + '\n' + read('src/glossary.js') + '\n' + data + '\n' + read('src/boot.js');
const html = read('src/shell.html')
  .replace('@@SPRITE@@', () => read('src/sprite.svg'))
  .replace('@@STYLES@@', () => read('src/styles.css'))
  .replace('@@SCRIPT@@', () => script);

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/index.html'), html);
console.log('built dist/index.html (' + html.length + ' chars, ' + manifest.length + ' stream file(s))');
