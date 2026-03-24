import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Tile {
  id: string;
  x: number;
  y: number;
  delay: number;
  isSlow: boolean;
  slowDuration: number;
  isYellow: boolean;
}

interface TileGridBackgroundProps {
  tileSize?: number;
}

export default function TileGridBackground({
  tileSize = 44,
}: TileGridBackgroundProps) {
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateDimensions = () => {
      const width = window.innerWidth;
      // Hero has a min-height of 850px, so we ensure we cover at least that
      const height = Math.max(window.innerHeight, 1000);

      const tileWidth = tileSize;
      const tileHeight = tileSize * 1.5;

      const cols = Math.ceil(width / tileWidth);
      const rows = Math.ceil(height / tileHeight);

      setDimensions({ cols, rows });
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [tileSize]);

  const tiles = useMemo(() => {
    if (!isMounted || dimensions.cols === 0 || dimensions.rows === 0) return [];

    const list: Tile[] = [];
    for (let r = 0; r < dimensions.rows; r++) {
      for (let c = 0; c < dimensions.cols; c++) {
        // PERFORMANCE BOOST: Renderizar solo un 15% de los cuadros. 
        // Como no tienen bordes visibles si su opacidad es 0 sobre fondo blanco, 
        // limitamos severamente el número de componentes React a procesar (de ~3500 a ~500)
        if (Math.random() > 0.15) continue;

        // Retardo puramente aleatorio para que aparezcan sin patrón
        const delay = Math.random() * 2.22;
        const isSlow = Math.random() < 0.15;
        const slowDuration = 3.55 + Math.random() * 1.77;
        const isYellow = Math.random() < 0.025; // 2.5% chance for yellow

        list.push({
          id: `${r}-${c}`,
          x: c * tileSize,
          y: r * (tileSize * 1.5),
          delay,
          isSlow,
          slowDuration,
          isYellow,
        });
      }
    }
    return list;
  }, [isMounted, dimensions, tileSize]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <svg
        width="100%"
        height="100%"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {tiles.map((tile) => (
          <motion.rect
            key={tile.id}
            x={tile.x}
            y={tile.y}
            width={tileSize}
            height={tileSize * 1.5}
            fill={tile.isYellow ? "#fff4cc" : "#e6f0ff"} /* Light yellow or light blue */
            stroke="#ffffff" /* Creates a natural gap on a white background */
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, tile.isSlow ? 0.3 : 0.8, 0] }}
            transition={{
              duration: tile.isSlow ? tile.slowDuration : 1.78 + tile.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tile.delay,
            }}
            style={{ 
              transformOrigin: `${tile.x + tileSize / 2}px ${tile.y + (tileSize * 1.5) / 2}px`
            }}
          />
        ))}
      </svg>
    </div>
  );
}
