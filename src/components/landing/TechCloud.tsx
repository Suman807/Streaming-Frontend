import { motion } from 'framer-motion'

// The real stack behind Streamly (frontend + Spring Boot backend).
const NAMES = ['Spring Boot', 'React', 'Cloudinary', 'PostgreSQL', 'Supabase', 'JWT', 'Vite', 'Resilience4j']

export default function TechCloud() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <p className="text-center text-xs uppercase tracking-widest text-white/40">
        Built on a stack you can trust
      </p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {NAMES.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="text-center text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
