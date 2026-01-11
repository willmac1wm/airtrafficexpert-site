import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const distPath = join(__dirname, 'dist');

// Check if dist directory exists
if (!existsSync(distPath)) {
  console.error(`ERROR: dist directory not found at ${distPath}`);
  console.error('Make sure to run "npm run build" before starting the server');
  process.exit(1);
}

console.log(`Starting server with dist path: ${distPath}`);

// Serve static files from dist directory (CSS, JS, images, etc.)
// This must come BEFORE the catch-all route
app.use(express.static(distPath, {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Handle all routes - serve index.html for SPA (BrowserRouter)
// This ensures React Router can handle client-side routing
// Static assets are served above, so this only catches page routes
// Using app.use for catch-all since Express 5.x doesn't support '*' wildcard
app.use((req, res, next) => {
  // Skip if it's a static asset request (has file extension)
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    return next();
  }
  
  // Only handle GET requests for page routes
  if (req.method !== 'GET') {
    return next();
  }
  
  // Serve index.html for all page routes
  res.sendFile(join(distPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${join(__dirname, 'dist')}`);
  console.log('Listening on all interfaces (0.0.0.0)');
});
// Build timestamp: Sat Jan 10 23:05:42 EST 2026
