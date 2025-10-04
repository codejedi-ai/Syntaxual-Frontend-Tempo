import React, { useRef, useEffect } from 'react';

declare global {
  interface Window {
    VANTA?: {
      CELLS: (options: any) => any;
    };
    THREE?: any;
  }
}

interface VantaBackgroundProps {
  className?: string;
}

export default function VantaBackground({ className = "" }: VantaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Add unique ID to container for Vanta targeting
    const container = containerRef.current;
    if (!container) return;

    const containerId = 'vanta-cells-' + Math.random().toString(36).substr(2, 9);
    container.id = containerId;

    // Load scripts exactly as specified
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const initializeVanta = async () => {
      try {
        // Load Three.js first, then Vanta.js
        await loadScript('https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js');

        // Wait for scripts to initialize
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!window.VANTA || !window.THREE) {
          console.error('Vanta or THREE.js not available');
          return;
        }

        // Clean up existing effect
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }

        // Initialize Vanta exactly as specified with darker colors
        vantaEffect.current = window.VANTA.CELLS({
          el: `#${containerId}`,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          color1: 0x1a1a3a, // Darker blue/purple
          color2: 0x4a1a4a  // Darker magenta/purple
        });
      } catch (error) {
        console.error('Failed to initialize Vanta background:', error);
        // Fallback styling with dark theme
        if (container) {
          container.style.background = `
            radial-gradient(ellipse at top, rgba(26, 26, 58, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(74, 26, 74, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(10, 5, 20, 0.9) 0%, rgba(20, 10, 30, 0.95) 100%)
          `;
        }
      }
    };

    initializeVanta();

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current && typeof vantaEffect.current.resize === 'function') {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(ellipse at top, rgba(26, 26, 58, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(74, 26, 74, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, rgba(10, 5, 20, 0.8) 0%, rgba(20, 10, 30, 0.9) 100%)
        `
      }}
    />
  );
}
