import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Jorge Mejía | Full Stack Software Engineer', description: 'Portfolio of Jorge Mejía, a full stack software engineer based in Guatemala City.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('jm-theme')||'dark'}catch(e){}`}} /></head><body>{children}</body></html> }
