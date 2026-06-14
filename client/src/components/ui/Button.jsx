import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-800 text-white hover:from-primary-700 hover:to-primary-900 shadow-lg shadow-primary-600/30',
  secondary: 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm',
  outline: 'border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white',
  ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
  ...props
}) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };
  const classes = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={classes} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={classes} onClick={onClick} {...props}>
      {children}
    </motion.button>
  );
}
