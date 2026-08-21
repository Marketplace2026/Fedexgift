const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, 'docx_extracted', 'word', 'document.xml');
const xmlContent = fs.readFileSync(xmlPath, 'utf8');

// Strip XML tags to get raw text
const text = xmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log("DOCUMENT TEXT:\n");
console.log(text);
