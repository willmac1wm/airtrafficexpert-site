import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from dist directory (CSS, JS, images, etc.)
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Handle all routes - serve index.html for SPA (HashRouter)
// This ensures React Router can handle client-side routing
app.get('*', (req, res) => {
  // If it's a request for a static asset, 404 will be returned by express.static above
  // Otherwise, serve index.html for SPA routing
  res.sendFile(join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${join(__dirname, 'dist')}`);
});
