const http = require('http');

const testEndpoints = [
  '/',
  '/assets/logo/company-logo.jpeg',
  '/assets/logo/logo-3d.png',
  '/assets/hero-frames/ezgif-frame-001.jpg',
  '/assets/hero-frames/ezgif-frame-150.jpg',
  '/assets/hero-frames/ezgif-frame-300.jpg',
  '/assets/animation/nail-360-turntable.mp4',
  '/assets/animation/anatomy-layers.png',
  '/assets/animation/hero-hand-editorial.png',
  '/assets/products/normal/JHB001.jpg',
  '/assets/products/premium/1.jpg',
  '/assets/products/premium/31-1.jpg'
];

let completed = 0;
let errors = 0;

testEndpoints.forEach(url => {
  http.get('http://127.0.0.1:3000' + url, (res) => {
    if (res.statusCode === 200) {
      console.log(`[PASS] ${url} -> Status 200 OK (${res.headers['content-type']})`);
    } else {
      console.error(`[FAIL] ${url} -> Status ${res.statusCode}`);
      errors++;
    }
    completed++;
    if (completed === testEndpoints.length) {
      console.log(`\nVerification finished: ${completed - errors}/${completed} endpoints passed.`);
    }
  }).on('error', (err) => {
    console.error(`[ERROR] ${url}:`, err.message);
    completed++;
    errors++;
  });
});
