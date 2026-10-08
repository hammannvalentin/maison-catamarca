import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function saveCatalogPlugin(): Plugin {
  return {
    name: 'save-catalog-plugin',
    configureServer(server) {
      // Serve images dynamically so any newly added images are served immediately
      server.middlewares.use('/images', (req, res, next) => {
        if (!req.url) return next();
        const imageName = req.url.replace(/^\//, '').split('?')[0];
        const filePath = path.resolve(process.cwd(), 'public/images', imageName);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
          };
          res.statusCode = 200;
          res.setHeader('Content-Type', mimeTypes[ext] || 'image/jpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });

      server.middlewares.use('/api/save-defaults', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { products, heroImage, discountAmount, whatsappNumber, instagramHandle } = data;

            const publicImagesDir = path.resolve(process.cwd(), 'public/images');
            const srcImagesDir = path.resolve(process.cwd(), 'src/assets/images');
            const distImagesDir = path.resolve(process.cwd(), 'dist/images');
            [publicImagesDir, srcImagesDir, distImagesDir].forEach((dir) => {
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            });

            const saveBase64 = (dataUrl: string, prefix: string): string => {
              if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
                return dataUrl;
              }
              const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
              if (!match) return dataUrl;
              const ext = match[1] === 'jpeg' ? 'jpg' : match[1].replace('+xml', '');
              const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.${ext}`;
              const buffer = Buffer.from(match[2], 'base64');
              [publicImagesDir, srcImagesDir, distImagesDir].forEach((dir) => {
                try {
                  fs.writeFileSync(path.join(dir, filename), buffer);
                } catch {}
              });
              return `/images/${filename}`;
            };

            // Process hero image
            const processedHeroImage = heroImage
              ? saveBase64(heroImage, 'hero')
              : '/images/hero_maison_cherry_1791472687984.jpg';

            // Process products
            const cleanProducts = (products || []).map((p: any, idx: number) => {
              const mainImage = saveBase64(p.image, `prod_${p.id || idx}_main`);
              const secImages = Array.isArray(p.secondaryImages)
                ? p.secondaryImages.map((sImg: string, sIdx: number) =>
                    saveBase64(sImg, `prod_${p.id || idx}_sec_${sIdx}`)
                  )
                : [];
              return {
                ...p,
                image: mainImage,
                secondaryImages: secImages,
              };
            });

            const cleanNumber =
              (typeof whatsappNumber === 'string'
                ? whatsappNumber.replace(/^"+|"+$/g, '')
                : whatsappNumber) || '543834765670';
            const cleanInstagram =
              (typeof instagramHandle === 'string'
                ? instagramHandle.replace(/^"+|"+$/g, '')
                : instagramHandle) || 'maisoncatamarca';

            // Write to src/data/products.ts
            const fileContent = `import { Product } from '../types';

export const INAUGURATION_DISCOUNT_AMOUNT = ${Number(discountAmount) || 10000};
export const STORE_WHATSAPP_NUMBER = ${JSON.stringify(cleanNumber)};
export const STORE_INSTAGRAM = ${JSON.stringify(cleanInstagram)};
export const DEFAULT_HERO_IMAGE = ${JSON.stringify(processedHeroImage)};

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Combos' },
  { id: 'cherry', label: 'Línea Cherry Signature' },
  { id: 'friends', label: 'Pack Friends & Compartidos' },
] as const;

export const PRODUCTS: Product[] = ${JSON.stringify(cleanProducts, null, 2)};
`;

            fs.writeFileSync(
              path.resolve(process.cwd(), 'src/data/products.ts'),
              fileContent,
              'utf-8'
            );

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                heroImage: processedHeroImage,
                products: cleanProducts,
              })
            );
          } catch (err: any) {
            console.error('Error saving defaults:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Error processing save' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), saveCatalogPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
