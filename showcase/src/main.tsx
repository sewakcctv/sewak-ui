import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../dist/components.css';
import './showcase.css';
import { Showcase } from './Showcase.js';

const root = document.getElementById('root');
if (!root) throw new Error('Showcase root element is missing');
createRoot(root).render(<StrictMode><Showcase /></StrictMode>);
