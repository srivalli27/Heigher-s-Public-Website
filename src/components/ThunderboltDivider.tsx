import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';

interface ThunderboltDividerProps {
  imgSrc?: string;
  className?: string;
}

export function ThunderboltDivider({ imgSrc, className = "" }: ThunderboltDividerProps) {
  if (imgSrc) {
    return (
      <div className={`relative flex items-center justify-center w-full py-4 overflow-hidden ${className}`}>
        {/* Left Line */}
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500" />
        
        {/* Center Image wrapped in ElectricBorder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mx-4 relative z-10 flex-shrink-0"
        >
          <ElectricBorder 
            color="#FF8C00" 
            speed={2} 
            chaos={0.3} 
            thickness={2} 
            className="rounded-full bg-background p-1"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center bg-black/50">
              <img 
                src={imgSrc} 
                alt="Section Icon" 
                className="w-full h-full object-cover"
              />
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Right Line */}
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-orange-500/50 to-orange-500" />
      </div>
    );
  }

  // Fallback: Straight distorted thunderbolt line
  return (
    <div className={`relative w-full py-12 overflow-hidden flex items-center justify-center ${className}`}>
       <div className="w-full">
          <motion.div
             initial={{ opacity: 0, scaleX: 0 }}
             whileInView={{ opacity: 1, scaleX: 1 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             viewport={{ once: true }}
          >
            <ElectricBorder 
              color="#ecb055" 
              speed={1} 
              chaos={0.3} 
              thickness={2}
              className="w-full"
            >
              {/* The content is just a thin line to give the border something to wrap */}
              <div className="w-full h-[1px] bg-orange-500/20" />
            </ElectricBorder>
          </motion.div>
       </div>
    </div>
  );
}
