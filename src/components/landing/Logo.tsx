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
    const nodes: { x: number; y: number }[] = [
      { x: 30, y: 30 },
      { x: 90, y: 30 },
      { x: 60, y: 90 },
      { x: 30, y: 60 },
      { x: 90, y: 60 },
    ];

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
      ctx.lineWidth = 2;
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
          }
        });
      });
      ctx.stroke();

      // Draw nodes
      nodes.forEach((node) => {
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          8,
        );
        gradient.addColorStop(0, "rgba(139, 92, 246, 1)");
        gradient.addColorStop(1, "rgba(67, 56, 202, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(
          node.x + Math.sin(frame / 30 + node.x) * 3,
          node.y + Math.cos(frame / 30 + node.y) * 3,
          8,
          0,
          Math.PI * 2,
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
        <div className="text-2xl font-bold text-white">S</div>
      </div>
    </motion.div>
  );
};

export default Logo;
