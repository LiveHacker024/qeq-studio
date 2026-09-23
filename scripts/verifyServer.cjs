const http = require('http');

http.get('http://127.0.0.1:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('HTML length:', data.length);
    console.log('Contains QeQ STUDIO title:', data.includes('QeQ STUDIO'));
    console.log('Contains main.tsx script:', data.includes('/src/main.tsx'));
    console.log('Server verified successfully!');
  });
}).on('error', (err) => {
  console.error('Server error:', err.message);
});
