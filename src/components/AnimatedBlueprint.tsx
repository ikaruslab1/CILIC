import React, { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Dimensions and Setup
const columns = 10;
const rows = 6;
const spacing = 400;
const startX = -1000;
const startY = -600;

const allWingTypes = [
  'officeWing',
  'serverWing',
  'conferenceWing',
  'atriumWing',
  'labWing',
  'parkingWing',
  'cafeteriaWing',
  'archiveWing'
];

function getBlockType(c: number, r: number) {
  const seed = Math.abs(c * 13 + r * 7);
  const modulo = seed % 10;
  if (modulo < 2) return 'officeWing';
  if (modulo < 4) return 'serverWing';
  if (modulo < 5) return 'conferenceWing';
  if (modulo < 6) return 'atriumWing';
  if (modulo < 7) return 'labWing';
  if (modulo < 8) return 'parkingWing';
  if (modulo < 9) return 'cafeteriaWing';
  return 'archiveWing';
}

function AnimatedBlock({ block, dist }: { block: any, dist: number }) {
  const [currentType, setCurrentType] = useState(block.type);
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    
    // The sequence starts with the initial entrance, then loops
    const runSequence = async () => {
      // 1. Initial entrance animation
      await controls.start({
        rotateX: 0,
        opacity: 1,
        scale: 1,
        transition: {
          delay: dist * 0.05 + 0.2, // Keep original stagger
          duration: 1.2,
          ease: "easeOut",
        }
      });

      // 2. Infinite Loop
      while (isMounted) {
        // Wait a long, random time (10 to 20 seconds between flips)
        const idleTime = 10000 + Math.random() * 10000;
        await new Promise(r => setTimeout(r, idleTime));
        if (!isMounted) break;

        // Flip out to 90deg (invisible edge), simulating revealing the back (white face is implicit in 2D SVG as it hides)
        await controls.start({
          rotateX: 90,
          scale: 0.8,
          transition: {
            duration: 0.6,
            ease: "easeIn"
          }
        });
        
        if (!isMounted) break;
        
        // Pick new random type while it's invisible at 90deg
        const randomType = allWingTypes[Math.floor(Math.random() * allWingTypes.length)];
        setCurrentType(randomType);
        
        // Instantly switch to -90deg so it comes from the other side
        controls.set({ rotateX: -90 });
        
        // Flip back in to 0deg revealing the new illustration
        await controls.start({
          rotateX: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut"
          }
        });
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [dist, controls]);

  return (
    <motion.g 
      initial={{ rotateX: -90, opacity: 0, scale: 0.8 }}
      animate={controls}
      style={{ transformOrigin: `${block.x + 200}px ${block.y + 200}px` }}
    >
      <g transform={`translate(${block.x}, ${block.y}) rotate(${block.rotate}, 200, 200)`}>
        {/* Blank explicitly white face base that hides global lines behind the block and acts as the "cara blanca" when rotating */}
        <rect width="400" height="400" fill="#f8f9fc" stroke="#ddd" strokeWidth="1" opacity="1" />
        <use href={`#${currentType}`} />
        <text 
          x="10" y="15" 
          fontFamily="monospace" fontSize="12" fill="#888" stroke="none" opacity="0.5"
        >
          SEC {Math.abs(block.x) / 10}-{Math.abs(block.y) / 10}
        </text>
      </g>
    </motion.g>
  );
}

export default function AnimatedBlueprint() {
  const blocks = useMemo(() => {
    const list = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const x = startX + c * spacing;
        const y = startY + r * spacing;
        const rotate = (c + r) % 2 === 0 ? 0 : 90;
        list.push({ id: `${r}-${c}`, x, y, c, r, type: getBlockType(c, r), rotate });
      }
    }
    return list;
  }, []);

  const pillars = useMemo(() => {
    const list = [];
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= columns; c++) {
        list.push({ id: `p-${r}-${c}`, x: startX + c * spacing, y: startY + r * spacing });
      }
    }
    return list;
  }, []);

  const lineVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: [0, 1, 1],
      transition: { duration: 2, ease: "easeInOut", delay: 1.5 } 
    }
  };

  const gridVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: { duration: 3 }
    }
  };

  return (
    <svg
      className="blueprint-svg w-full h-full block object-cover"
      viewBox="-960 -540 3840 2160"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* LIGHT GRAY PALETTE */}
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#999" strokeWidth="0.3" opacity="0.3" />
        </pattern>
        <pattern id="largeGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)" stroke="none" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#888" strokeWidth="0.5" opacity="0.4" />
        </pattern>

        <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#888" strokeWidth="0.8" opacity="0.6" />
        </pattern>
        <pattern id="crosshatch" width="10" height="10" patternTransform="rotate(0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="10" y2="10" stroke="#888" strokeWidth="0.5" opacity="0.6"/>
          <line x1="10" y1="0" x2="0" y2="10" stroke="#888" strokeWidth="0.5" opacity="0.6"/>
        </pattern>

        <pattern id="deskGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect x="10" y="10" width="25" height="15" fill="none" stroke="#888" strokeWidth="1.5"/>
          <circle cx="22.5" cy="32" r="4" fill="none" stroke="#888" strokeWidth="1"/>
          <rect x="45" y="10" width="25" height="15" fill="none" stroke="#888" strokeWidth="1.5"/>
          <circle cx="57.5" cy="32" r="4" fill="none" stroke="#888" strokeWidth="1"/>
          <rect x="10" y="55" width="25" height="15" fill="none" stroke="#888" strokeWidth="1.5"/>
          <circle cx="22.5" cy="48" r="4" fill="none" stroke="#888" strokeWidth="1"/>
          <rect x="45" y="55" width="25" height="15" fill="none" stroke="#888" strokeWidth="1.5"/>
          <circle cx="57.5" cy="48" r="4" fill="none" stroke="#888" strokeWidth="1"/>
        </pattern>

        <pattern id="techRacks" width="40" height="100" patternUnits="userSpaceOnUse">
          <rect x="5" y="5" width="30" height="90" fill="none" stroke="#888" strokeWidth="1.5"/>
          <line x1="5" y1="20" x2="35" y2="20" stroke="#888" strokeWidth="1"/>
          <line x1="5" y1="35" x2="35" y2="35" stroke="#888" strokeWidth="1"/>
          <line x1="5" y1="50" x2="35" y2="50" stroke="#888" strokeWidth="1"/>
          <line x1="5" y1="65" x2="35" y2="65" stroke="#888" strokeWidth="1"/>
          <line x1="5" y1="80" x2="35" y2="80" stroke="#888" strokeWidth="1"/>
          <circle cx="20" cy="12" r="2" fill="none" stroke="#888" />
        </pattern>

        <pattern id="topoLines" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 0 50 Q 50 20 100 80 T 200 60" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="8,4" />
          <path d="M 0 100 Q 80 80 120 150 T 200 120" fill="none" stroke="#888" strokeWidth="1" />
          <path d="M 0 150 Q 60 180 150 100 T 200 180" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="4,6" />
        </pattern>

        <pattern id="trees" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#888" strokeWidth="1.5" strokeDasharray="5,3" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#888" strokeWidth="1" />
          <circle cx="50" cy="50" r="5" fill="none" stroke="#888" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="50" y2="25" stroke="#888" strokeWidth="1" />
          <line x1="50" y1="75" x2="50" y2="90" stroke="#888" strokeWidth="1" />
          <line x1="10" y1="50" x2="25" y2="50" stroke="#888" strokeWidth="1" />
          <line x1="75" y1="50" x2="90" y2="50" stroke="#888" strokeWidth="1" />
        </pattern>

        <pattern id="floorTiles" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="none" stroke="#888" strokeWidth="1" />
          <line x1="25" y1="0" x2="25" y2="50" stroke="#888" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="25" x2="50" y2="25" stroke="#888" strokeWidth="0.5" strokeDasharray="2,2" />
        </pattern>

        <pattern id="parkingSpots" width="100" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#ccc" strokeWidth="1" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#ccc" strokeWidth="1" />
          {/* car placeholder - more spaced out */}
          <rect x="15" y="15" width="70" height="30" rx="3" fill="none" stroke="#ddd" strokeWidth="1" />
        </pattern>

        <pattern id="cafeteriaTables" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="20" stroke="#ccc" strokeWidth="1" />
          <circle cx="20" cy="60" r="5" stroke="#ccc" />
          <circle cx="100" cy="60" r="5" stroke="#ccc" />
          <circle cx="60" cy="20" r="5" stroke="#ccc" />
          <circle cx="60" cy="100" r="5" stroke="#ccc" />
        </pattern>

        <pattern id="archiveShelves" width="80" height="40" patternUnits="userSpaceOnUse">
          <rect x="5" y="5" width="70" height="30" stroke="#ccc" strokeWidth="1" />
          <line x1="40" y1="5" x2="40" y2="35" stroke="#ccc" strokeWidth="0.5" />
        </pattern>

        {/* Modules */}
        <g id="officeWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1.5" />
          <rect x="20" y="20" width="360" height="360" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" strokeDasharray="10,10" />
          <line x1="20" y1="160" x2="380" y2="160" strokeWidth="1.2" />
          <line x1="20" y1="240" x2="380" y2="240" strokeWidth="1.2" />
          <rect x="30" y="30" width="340" height="120" fill="url(#deskGrid)" stroke="none" />
          <rect x="30" y="250" width="340" height="120" fill="url(#deskGrid)" stroke="none" />
          <path d="M 180 160 A 30 30 0 0 1 150 130" strokeDasharray="3,3" />
          <line x1="180" y1="160" x2="150" y2="160" />
          <path d="M 220 240 A 30 30 0 0 1 250 270" strokeDasharray="3,3" />
          <line x1="220" y1="240" x2="250" y2="240" />
        </g>

        <g id="serverWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1.5" />
          <rect x="30" y="30" width="340" height="340" fill="url(#floorTiles)" stroke="none" />
          <rect x="50" y="50" width="120" height="300" fill="url(#techRacks)" stroke="none" />
          <rect x="230" y="50" width="120" height="300" fill="url(#techRacks)" stroke="none" />
          <line x1="10" y1="100" x2="390" y2="100" strokeWidth="1.5" strokeDasharray="15,5,5,5" />
          <line x1="10" y1="300" x2="390" y2="300" strokeWidth="1.5" strokeDasharray="15,5,5,5" />
          <circle cx="200" cy="200" r="30" strokeWidth="1.5" fill="url(#crosshatch)" />
          <line x1="10" y1="10" x2="390" y2="390" strokeWidth="0.5" strokeDasharray="5,5" />
          <line x1="390" y1="10" x2="10" y2="390" strokeWidth="0.5" strokeDasharray="5,5" />
        </g>

        <g id="conferenceWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="150" strokeWidth="1.2" strokeDasharray="20,10" />
          <circle cx="200" cy="200" r="120" strokeWidth="1" strokeDasharray="15,5" />
          <circle cx="200" cy="200" r="90" strokeWidth="0.8" strokeDasharray="10,5" />
          <path d="M 120 200 A 80 80 0 0 0 280 200 Z" strokeWidth="1.5" />
          <circle cx="200" cy="260" r="10" />
          <line x1="20" y1="200" x2="60" y2="200" strokeWidth="2" />
          <line x1="340" y1="200" x2="380" y2="200" strokeWidth="2" />
          <rect x="150" y="150" width="100" height="20" strokeWidth="1" />
        </g>

        <g id="atriumWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1" strokeDasharray="5,5" />
          <rect x="10" y="10" width="380" height="380" fill="url(#topoLines)" stroke="none" />
          <circle cx="100" cy="100" r="80" fill="url(#trees)" stroke="none" />
          <circle cx="300" cy="300" r="90" fill="url(#trees)" stroke="none" />
          <circle cx="320" cy="120" r="60" fill="url(#trees)" stroke="none" />
          <path d="M 10 200 Q 200 100 390 300" strokeWidth="2" strokeDasharray="10,5" />
          <path d="M 200 10 Q 150 200 250 390" strokeWidth="2" strokeDasharray="10,5" />
          <circle cx="200" cy="200" r="40" strokeWidth="1.5" fill="url(#smallGrid)" />
          <circle cx="200" cy="200" r="20" strokeWidth="1" />
        </g>

        <g id="labWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="2" />
          <rect x="20" y="20" width="160" height="160" strokeWidth="1.5" />
          <rect x="220" y="20" width="160" height="160" strokeWidth="1.5" />
          <rect x="20" y="220" width="160" height="160" strokeWidth="1.5" />
          <rect x="220" y="220" width="160" height="160" strokeWidth="1.5" />
          <rect x="40" y="40" width="120" height="40" fill="url(#hatch)" stroke="none" />
          <rect x="240" y="40" width="120" height="40" fill="url(#hatch)" stroke="none" />
          <rect x="40" y="240" width="120" height="40" fill="url(#hatch)" stroke="none" />
          <rect x="240" y="240" width="120" height="40" fill="url(#hatch)" stroke="none" />
          <circle cx="200" cy="200" r="40" strokeWidth="2" />
          <rect x="190" y="190" width="20" height="20" />
          <line x1="180" y1="100" x2="220" y2="100" strokeWidth="1" />
          <line x1="180" y1="300" x2="220" y2="300" strokeWidth="1" />
          <line x1="100" y1="180" x2="100" y2="220" strokeWidth="1" />
          <line x1="300" y1="180" x2="300" y2="220" strokeWidth="1" />
        </g>

        <g id="parkingWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1.5" />
          {/* Main vertical driving lanes */}
          <rect x="160" y="10" width="80" height="380" strokeWidth="1" strokeDasharray="10,5" />
          {/* Parking zones left and right */}
          <rect x="20" y="20" width="140" height="360" fill="url(#parkingSpots)" stroke="none" />
          <rect x="240" y="20" width="140" height="360" fill="url(#parkingSpots)" stroke="none" />
          <circle cx="200" cy="200" r="15" strokeWidth="1.5" />
        </g>

        <g id="cafeteriaWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1.5" />
          {/* Dining area boundary */}
          <path d="M 190 10 L 190 150 A 100 100 0 0 0 10 250" strokeWidth="1.5" strokeDasharray="10,5" />
          <rect x="20" y="20" width="360" height="360" fill="url(#cafeteriaTables)" stroke="none" />
          {/* Food Counters - now just outlines */}
          <rect x="200" y="20" width="160" height="40" strokeWidth="1" />
          <rect x="200" y="80" width="160" height="40" strokeWidth="1" />
          <rect x="20" y="280" width="140" height="40" strokeWidth="1" />
        </g>

        <g id="archiveWing" stroke="#ccc" fill="none">
          <rect x="10" y="10" width="380" height="380" strokeWidth="1.5" />
          {/* High density archive racks */}
          <rect x="20" y="20" width="360" height="360" fill="url(#archiveShelves)" stroke="none" />
          {/* Main corridor - clearly defined with lines instead of fill */}
          <line x1="150" y1="10" x2="150" y2="390" stroke="#ccc" strokeWidth="1.5" />
          <line x1="250" y1="10" x2="250" y2="390" stroke="#ccc" strokeWidth="1.5" />
          {/* Center desk component - line only */}
          <rect x="180" y="180" width="40" height="40" strokeWidth="1" />
          <circle cx="200" cy="200" r="5" strokeWidth="1" />
        </g>
      </defs>

      {/* Massive Background Grid */}
      <motion.rect 
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        x="-1000" y="-1000" width="6000" height="4000" fill="url(#largeGrid)" 
      />

      {/* The Architectural Blueprint Composition */}
      <g strokeLinecap="round" strokeLinejoin="round">
        
        {/* Animated Blocks - individually managed for random infinite flipping */}
        {blocks.map((block) => {
          const dist = Math.sqrt(Math.pow(block.c - 5, 2) + Math.pow(block.r - 3, 2));
          return <AnimatedBlock key={block.id} block={block} dist={dist} />;
        })}

        {/* Global Structure Connectors animates in by drawing */}
        <g stroke="#ccc" fill="none" opacity="0.8">
          {Array.from({length: rows + 1}).map((_, i) => (
            <motion.g key={`h-${i}`}>
              <motion.line variants={lineVariants} initial="hidden" animate="visible" x1={startX} y1={startY + i * spacing} x2={startX + columns * spacing} y2={startY + i * spacing} strokeWidth="1.5" />
              <motion.line variants={lineVariants} initial="hidden" animate="visible" x1={startX} y1={startY + i * spacing + 10} x2={startX + columns * spacing} y2={startY + i * spacing + 10} strokeWidth="0.5" strokeDasharray="10,5" />
            </motion.g>
          ))}
          
          {Array.from({length: columns + 1}).map((_, i) => (
            <motion.g key={`v-${i}`}>
              <motion.line variants={lineVariants} initial="hidden" animate="visible" x1={startX + i * spacing} y1={startY} x2={startX + i * spacing} y2={startY + rows * spacing} strokeWidth="1.5" />
              <motion.line variants={lineVariants} initial="hidden" animate="visible" x1={startX + i * spacing + 10} y1={startY} x2={startX + i * spacing + 10} y2={startY + rows * spacing} strokeWidth="0.5" strokeDasharray="10,5" />
            </motion.g>
          ))}

          {pillars.map((pillar, i) => (
            <motion.g 
              key={pillar.id} transform={`translate(${pillar.x}, ${pillar.y})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2 + (i * 0.01), type: 'spring' }}
            >
              <rect x="-15" y="-15" width="30" height="30" strokeWidth="1" />
              <circle cx="0" cy="0" r="10" strokeWidth="0.8" />
            </motion.g>
          ))}

          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1={startX} y1={startY} x2={startX + columns * spacing} y2={startY + rows * spacing} strokeWidth="1" strokeDasharray="30,15" opacity="0.3" />
          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1={startX + columns * spacing} y1={startY} x2={startX} y2={startY + rows * spacing} strokeWidth="1" strokeDasharray="30,15" opacity="0.3" />
        </g>

        {/* Center Crosshairs / Core Alignment framing */}
        <motion.g 
          stroke="#ccc" strokeWidth="1" fill="none" opacity="0.7"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        >
          <motion.circle 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 200, ease: "linear" }}
            cx="960" cy="540" r="800" strokeDasharray="20,10" strokeWidth="1" 
            style={{ transformOrigin: "960px 540px" }}
          />
          <circle cx="960" cy="540" r="820" strokeWidth="0.5" />
          
          <line x1="-960" y1="540" x2="2880" y2="540" strokeWidth="1" strokeDasharray="40,10,10,10" />
          <line x1="960" y1="-540" x2="960" y2="1620" strokeWidth="1" strokeDasharray="40,10,10,10" />

          <rect x="560" y="340" width="800" height="400" strokeWidth="1" strokeDasharray="5,5" />
          
          <text x="960" y="520" fontFamily="monospace" fontSize="16" fill="#999" stroke="none" textAnchor="middle" fontWeight="bold" opacity="0.6">
            CILUC 2026 - MASTER PLAN OVERVIEW
          </text>
          <text x="960" y="565" fontFamily="monospace" fontSize="12" fill="#999" stroke="none" textAnchor="middle" letterSpacing="4" opacity="0.5">
            SCALE 1:5000 | COORD 960,540
          </text>
        </motion.g>

      </g>
    </svg>
  );
}
