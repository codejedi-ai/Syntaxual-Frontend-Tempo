import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 120;
    canvas.height = 120;

    // Animation variables
    let frame = 0;

    // Create points along the shape of curly braces
    const leftBracePoints: { x: number; y: number }[] = [];
    const rightBracePoints: { x: number; y: number }[] = [];
    
    // Generate points for left brace
    for (let i = 0; i < 15; i++) {
      const y = 15 + (i * 6);
      let x = 35;
      
      // Adjust x to form curly brace shape
      if (i < 4) x = 35 - (i * 3); // Top curve
      else if (i < 7) x = 25 + ((i-4) * 3); // Middle top
      else if (i === 7) x = 30; // Middle
      else if (i < 11) x = 35 - ((i-7) * 3); // Middle bottom
      else x = 20 + ((i-10) * 4); // Bottom curve
      
      leftBracePoints.push({ x, y });
    }
    
    // Generate points for right brace
    for (let i = 0; i < 15; i++) {
      const y = 15 + (i * 6);
      let x = 85;
      
      // Adjust x to form curly brace shape
      if (i < 4) x = 85 + (i * 3); // Top curve
      else if (i < 7) x = 95 - ((i-4) * 3); // Middle top
      else if (i === 7) x = 90; // Middle
      else if (i < 11) x = 85 + ((i-7) * 3); // Middle bottom
      else x = 100 - ((i-10) * 4); // Bottom curve
      
      rightBracePoints.push({ x, y });
    }

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the curly braces text with glow effect
      ctx.font = "bold 70px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Draw glow effect
      ctx.shadowBlur = 10 + Math.sin(frame / 20) * 5;
      ctx.shadowColor = "rgba(236, 72, 153, 0.8)";
      ctx.fillStyle = "rgba(219, 39, 119, 0.9)";
      
      // Draw { and }
      ctx.fillText("{", 40, 60);
      ctx.fillText("}", 80, 60);
      
      // Draw the node points on the braces for enhanced effect
      [...leftBracePoints, ...rightBracePoints].forEach((point) => {
        const pulseSize = 2 + Math.sin(frame / 20 + point.x) * 1;
        
        const gradient = ctx.createRadialGradient(
          point.x + Math.sin(frame / 40 + point.y) * 2,
          point.y + Math.cos(frame / 40 + point.x) * 2,
          0,
          point.x + Math.sin(frame / 40 + point.y) * 2,
          point.y + Math.cos(frame / 40 + point.x) * 2,
          pulseSize * 2
        );
        
        gradient.addColorStop(0, "rgba(236, 72, 153, 0.8)");
        gradient.addColorStop(1, "rgba(190, 24, 93, 0)");
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(
          point.x + Math.sin(frame / 40 + point.y) * 2,
          point.y + Math.cos(frame / 40 + point.x) * 2,
          pulseSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative w-[120px] h-[120px] bg-slate-900 rounded-xl ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-2xl font-bold text-pink-500"></div>
      </div>
    </motion.div>
  );
};

export default Logo;
