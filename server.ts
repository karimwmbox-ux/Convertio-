import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log(`[Converto] Running in pure client-side sandbox environment. NODE_ENV = "${process.env.NODE_ENV}"`);

  app.use(express.json({ limit: '50mb' }));

  // Vite Setup (resilient check for development mode)
  const isProductionMode = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(process.cwd(), 'dist', 'index.html'));
  
  if (!isProductionMode) {
    console.log('[Converto] Starting in DEVELOPMENT mode (Vite Middleware active)');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    
    // Log incoming requests for easy debugging
    app.use((req, res, next) => {
      console.log(`[HTTP] ${req.method} ${req.url}`);
      next();
    });

    app.use(vite.middlewares);

    // Bulletproof HTML fallback for development mode SPA
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Log incoming production requests
    app.use((req, res, next) => {
      console.log(`[Prod HTTP] ${req.method} ${req.url}`);
      next();
    });

    // High-speed long-term caching for immutable assets
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
      etag: true
    }));
    app.use(express.static(distPath, {
      maxAge: '1d',
      etag: true
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
