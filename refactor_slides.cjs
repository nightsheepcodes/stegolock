const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'resources/js/Pages/Presentation.jsx');
const content = fs.readFileSync(file, 'utf8');

// Find start and end of slides definition
const startIndex = content.indexOf('    const slides = useMemo(() => [');
const endIndexStr = '    ], [safeStats, demoStep, demoMode, demoActive, activeSteps]);';
const endIndex = content.indexOf(endIndexStr) + endIndexStr.length;

const slidesContent = content.substring(startIndex, endIndex);

// We want to export a hook from PresentationSlides.jsx
const hookContent = `import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Shield, Lock, Layers, Target,
    Trophy, Users, Cpu, Database, 
    Compass, FileText, Volume2, Image,
    Cloud, FileDigit
} from 'lucide-react';

export function usePresentationSlides({ safeStats, demoStep, demoMode, demoActive, activeSteps }) {
    return ${slidesContent.trim().replace('const slides = useMemo', 'useMemo')}
}
`;

fs.writeFileSync(path.join(__dirname, 'resources/js/Components/PresentationSlides.jsx'), hookContent, 'utf8');

// Replace in Presentation.jsx
const newPresentationContent = content.substring(0, startIndex) + `    const slides = usePresentationSlides({ safeStats, demoStep, demoMode, demoActive, activeSteps });` + content.substring(endIndex);

// add import to Presentation.jsx
const finalContent = newPresentationContent.replace(
    `import { DecorativeBackground } from '@/Components/DecorativeBackground';`,
    `import { DecorativeBackground } from '@/Components/DecorativeBackground';\nimport { usePresentationSlides } from '@/Components/PresentationSlides';`
);

fs.writeFileSync(file, finalContent, 'utf8');
