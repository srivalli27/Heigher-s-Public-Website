import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

interface BounceCardItem {
  title: string;
  description: string;
  tag?: string;
}

interface BounceCardsProps {
  className?: string;
  items?: BounceCardItem[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = '',
  items = [],
  containerWidth = 500,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles,
  enableHover = true
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate dynamic transforms if not provided, to handle any number of items
  const getTransforms = () => {
    if (transformStyles) return transformStyles;
    
    const total = items.length;
    const transforms: string[] = [];
    // Spread cards across a fan of approx 60 degrees (-30 to +30)
    // and spread X position
    
    for (let i = 0; i < total; i++) {
      // Calculate normalized position from -1 to 1
      const normalizedPos = total > 1 ? (i / (total - 1)) * 2 - 1 : 0;
      
      const rotate = normalizedPos * 10; // -10deg to +10deg
      const translateX = normalizedPos * 450; // Increased spread for better visibility
      const translateY = Math.abs(normalizedPos) * 10; // Slight arch effect
      
      transforms.push(`rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`);
    }
    return transforms;
  };

  const activeTransforms = getTransforms();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px,?\s*([-0-9.]*)px?\)/;
    const match = baseTransform.match(translateRegex);
    
    // Fallback for simple translate(x)
    const simpleTranslateRegex = /translate\(([-0-9.]+)px\)/;
    const simpleMatch = baseTransform.match(simpleTranslateRegex);

    if (match) {
      const currentX = parseFloat(match[1]);
      const currentY = match[2] ? parseFloat(match[2]) : 0;
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px, ${currentY}px)`);
    } else if (simpleMatch) {
       const currentX = parseFloat(simpleMatch[1]);
       const newX = currentX + offsetX;
       return baseTransform.replace(simpleTranslateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    
    items.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = activeTransforms[i] || 'none';

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        // Bring active card to front and scale up
        gsap.to(selector, {
          transform: noRotation,
          scale: 1.15,
          zIndex: 100,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Push others away
        const offsetX = i < hoveredIdx ? -140 : 140;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.03;

        gsap.to(selector, {
          transform: pushedTransform,
          scale: 0.95,
          zIndex: i, // Restore z-index stack
          duration: 0.6,
          ease: 'power2.out',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    items.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);
      const baseTransform = activeTransforms[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        scale: 1,
        zIndex: i,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
        margin: '0 auto'
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`card card-${idx} border-primary/20 hover:border-primary/60 transition-colors`}
          style={{ 
            transform: activeTransforms[idx] ?? 'none',
            zIndex: idx
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <div className="card-content">
            <h3 className="text-lg font-heading font-bold text-foreground mb-2 leading-tight">
              {item.title}
            </h3>
            <div className="w-8 h-1 bg-primary/40 rounded-full mb-3"></div>
            <p className="text-xs text-muted-foreground line-clamp-4">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
