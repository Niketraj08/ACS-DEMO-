import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

const schema = yup.object({
  fullName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string(),
  companyName: yup.string(),
  serviceRequirement: yup.string(),
  message: yup.string().required('Message is required').min(10, 'Message too short'),
});

const services = [
  'Website Development', 'Custom Software', 'Mobile App', 'AI Solutions',
  'Cloud Services', 'UI/UX Design', 'Digital Marketing', 'ERP & CRM', 'Other',
];

export default function Contact({ compact }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await publicApi.contact(data);
      toast.success('Message sent! We will contact you soon.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className={`section-padding ${compact ? '' : 'gradient-bg'}`}>
      <div className="container-custom">
        <SectionTitle
          light={!compact}
          subtitle="Contact Us"
          title="Let's Build Something Great"
          description="Get in touch for a free consultation and project estimate."
        />
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {!compact && (
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-white space-y-6">
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">📧 Email Us</h3>
                <p className="text-gray-300">info@astracognix.com</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">📞 Call Us</h3>
                <p className="text-gray-300">+91 98765 43210</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">🕐 Business Hours</h3>
                <p className="text-gray-300">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
              </div>
            </motion.div>
          )}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className={`p-8 rounded-2xl space-y-4 ${compact ? 'bg-white dark:bg-gray-800 shadow-xl border dark:border-gray-700' : 'glass'}`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input {...register('fullName')} placeholder="Full Name *" className={`form-input ${compact ? 'form-input-light' : 'form-input-glass'}`} />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <input {...register('email')} type="email" placeholder="Email *" className={`form-input ${compact ? 'form-input-light' : 'form-input-glass'}`} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input {...register('phone')} placeholder="Phone Number" className={`form-input ${compact ? 'form-input-light' : 'form-input-glass'}`} />
              <input {...register('companyName')} placeholder="Company Name" className={`form-input ${compact ? 'form-input-light' : 'form-input-glass'}`} />
            </div>
            <select {...register('serviceRequirement')} className={`form-input ${compact ? 'form-input-light' : 'form-input-glass'}`}>
              <option value="">Select Service Requirement</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <div>
              <textarea {...register('message')} rows={4} placeholder="Your Message *" className={`form-input resize-none ${compact ? 'form-input-light' : 'form-input-glass'}`} />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
