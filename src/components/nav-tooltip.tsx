import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface NavTooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
  position?: 'right' | 'left' | 'top' | 'bottom';
}

export function NavTooltip({ 
  content, 
  children, 
  delay = 1000, 
  position = 'right' 
}: NavTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  // Check if component is mounted (for SSR safety)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateAndShowTooltip = () => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    const position = {
      x: rect.right + scrollX + 12, // 12px offset from the right edge
      y: rect.top + scrollY + rect.height / 2 // Center vertically
    };
    
    // Set position and show in the same state update to avoid jumping
    setTooltipPosition(position);
    setShowTooltip(true);
  };

  const hideTooltip = () => {
    setShowTooltip(false);
    // Don't reset position immediately to avoid flicker
    setTimeout(() => {
      if (!showTooltip) {
        setTooltipPosition(null);
      }
    }, 150);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(calculateAndShowTooltip, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    hideTooltip();
  };

  // Update position on scroll or resize when tooltip is visible
  useEffect(() => {
    if (showTooltip && tooltipPosition) {
      const handlePositionUpdate = () => {
        if (!elementRef.current) return;
        
        const rect = elementRef.current.getBoundingClientRect();
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        setTooltipPosition({
          x: rect.right + scrollX + 12,
          y: rect.top + scrollY + rect.height / 2
        });
      };

      window.addEventListener('scroll', handlePositionUpdate, { passive: true });
      window.addEventListener('resize', handlePositionUpdate);
      
      return () => {
        window.removeEventListener('scroll', handlePositionUpdate);
        window.removeEventListener('resize', handlePositionUpdate);
      };
    }
  }, [showTooltip, tooltipPosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={elementRef}
        className="relative inline-block w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      {/* Only render when mounted, visible, and position is set */}
      {isMounted && showTooltip && tooltipPosition && createPortal(
        <div
          className="fixed z-[9999] pointer-events-none animate-tooltip-in"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateY(-50%)',
            maxWidth: '250px'
          }}
        >
          <div className="relative">
            {/* Arrow */}
            <div 
              className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderRight: '6px solid hsl(var(--card))',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
              }}
            />
            
            {/* Tooltip Content */}
            <div className="bg-card text-card-foreground border border-border rounded-lg px-3 py-2 shadow-xl backdrop-blur-sm">
              <span className="text-sm font-medium whitespace-nowrap block">
                {content}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}