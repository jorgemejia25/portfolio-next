'use client';
import {useState} from 'react';
export function CopyEmail(){const [status,setStatus]=useState('copy email');async function copy(){try{await navigator.clipboard.writeText('devjorgemejia@gmail.com');setStatus('copied')}catch{setStatus('copy unavailable')}setTimeout(()=>setStatus('copy email'),1600)}return <button className="button" onClick={copy} aria-live="polite">[ {status} ]</button>}
