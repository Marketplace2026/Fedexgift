const fs = require('fs');
const path = require('path');
const https = require('https');

const items = [
  { name: 'tesla.jpg', url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80' },
  { name: 'iphone.jpg', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80' },
  { name: 'rolex.jpg', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
  { name: 'mercedes.jpg', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80' },
  { name: 'macbook.jpg', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
  { name: 'harley.jpg', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80' },
  { name: 'ps5.jpg', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80' },
  { name: 'porsche.jpg', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80' }
];

const destDir = path.join(__dirname, '..', 'public', 'images', 'items');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const item of items) {
    const dest = path.join(destDir, item.name);
    console.log(`Downloading ${item.name}...`);
    try {
      await downloadFile(item.url, dest);
      console.log(`Saved ${item.name}`);
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }
}

run();
