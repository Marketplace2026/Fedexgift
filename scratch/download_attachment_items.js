const fs = require('fs');
const path = require('path');
const https = require('https');

const items = [
  { name: 'jeep.jpg', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80' },
  { name: 'fiat500.jpg', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80' },
  { name: 'same.jpg', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80' },
  { name: 'carraro.jpg', url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80' },
  { name: 'iphone.jpg', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80' },
  { name: 'ipad.jpg', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80' },
  { name: 'samsung.jpg', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
  { name: 'smeg_frigo.jpg', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80' },
  { name: 'smeg_cafe.jpg', url: 'https://images.unsplash.com/photo-1517668808822-9e4288246ede?w=800&auto=format&fit=crop&q=80' },
  { name: 'sac_cuir.jpg', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80' },
  { name: 'costume.jpg', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80' },
  { name: 'excavatrice.jpg', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80' },
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
