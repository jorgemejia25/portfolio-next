# Jorge Mejía — Portfolio

Next.js App Router portfolio based on the supplied v2 design.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` and `npm start` for a production build.

Content lives in `lib/data.ts`; UI is organized into `components/atoms`, `components/molecules`, and `components/organisms`. ASCII text layers use the original v2 frame equations, animate only in the viewport and honor the system reduced-motion preference. Animation updates run outside React rendering and pause when the browser tab is hidden. The header shares the content container width. Theme selection is saved locally.
