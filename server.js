import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from dist directory (CSS, JS, images, etc.)
// This must come BEFORE the catch-all route
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Handle all routes - serve index.html for SPA (BrowserRouter)
// This ensures React Router can handle client-side routing
// Static assets are served above, so this only catches page routes
app.get('*', (req, res, next) => {
  // Skip if it's a static asset request (has file extension)
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    return next();
  }
  
  // Serve index.html for all page routes
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
