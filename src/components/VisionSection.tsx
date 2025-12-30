import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/20">
      <div className="container px-4">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-heading"
          >
            Our Vision and Thought
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold mt-4 mb-8"
          >
            The <span className="text-primary">Competetive Gaming Hub</span> of IIT Madras BS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8"
          >
            Heighers eSports Society aims to build a diverse and inclusive gaming community where students from different 
            backgrounds can come together through competitive gaming.


          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8"
          >
            We value fair play, respect, teamwork, and sportsmanship, and strive to create an environment that encourages 
            continuous improvement through participation and competition.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-base leading-relaxed"
          >
            At Heighers, excellence is achieved not through formal training, but through exposure, experience, 
            and community-driven growth.

          </motion.p>
        </div>
      </div>
    </section>
  );
}
