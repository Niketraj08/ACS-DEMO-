import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { publicApi } from '../api';
import SEO from '../components/ui/SEO';
import SectionTitle from '../components/ui/SectionTitle';

export default function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    publicApi.careers().then((res) => setCareers(res.data.data || [])).catch(() => {});
  }, []);

  const onApply = async (data) => {
    try {
      await publicApi.applyCareer(selected, data);
      toast.success('Application submitted!');
      setSelected(null);
      reset();
    } catch {
      toast.error('Application failed');
    }
  };

  return (
    <>
      <SEO title="Careers" description="Join Astra Cognix Solutions - exciting career opportunities." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Careers</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Build your future with our innovative team.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {['Internship Program', 'Open Positions', 'Training Program'].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl gradient-bg text-white text-center">
                <h3 className="font-display font-bold text-lg">{t}</h3>
                <p className="text-gray-200 text-sm mt-2">Grow your career with us</p>
              </div>
            ))}
          </div>
          <SectionTitle subtitle="Openings" title="Current Open Positions" />
          <div className="space-y-4 max-w-3xl mx-auto">
            {careers.map((job) => (
              <motion.div key={job._id} className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.department} • {job.location} • {job.type}</p>
                  </div>
                  <button onClick={() => setSelected(job._id)} className="px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">{job.description}</p>
              </motion.div>
            ))}
            {!careers.length && <p className="text-center text-gray-500">No open positions currently. Check back soon!</p>}
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSubmit(onApply)} className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full space-y-4">
            <h3 className="font-bold text-xl dark:text-white">Apply for Position</h3>
            <input {...register('name', { required: true })} placeholder="Full Name" className="form-input form-input-light" required />
            <input {...register('email', { required: true })} type="email" placeholder="Email" className="form-input form-input-light" required />
            <input {...register('phone')} placeholder="Phone" className="form-input form-input-light" />
            <textarea {...register('coverLetter')} placeholder="Cover Letter" rows={3} className="form-input form-input-light resize-none" />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold">Submit</button>
              <button type="button" onClick={() => setSelected(null)} className="px-4 py-3 border rounded-xl dark:text-white">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
