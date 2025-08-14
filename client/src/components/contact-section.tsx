import { FaWhatsapp } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0d0d25] via-[#1a1a3d] to-[#0d0d25] py-24 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-10">
        <h2 className="text-4xl font-bold text-white">Turn Your Passion into a Profession!</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Ready to learn in-demand skills like Full Stack Development, Data Analytics, Graphic Designing, and more?
          Join <span className="font-semibold text-blue-400">TechSol</span> and get <span className="text-green-400">100% placement assistance</span> with expert-led training.
        </p>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-xl max-w-2xl mx-auto space-y-6">
          <p className="text-xl text-white">
            📍 <span className="text-gray-300">Location:</span> Radiance Building, Near Al Shifa Hospital, Abul Fazal, Jamia Nagar, Okhla
          </p>
          <p className="text-xl text-white flex items-center justify-center gap-2">
            <FaWhatsapp className="text-green-400 text-2xl" />
            <span className="text-gray-300">Call/WhatsApp:</span>
            <a
              href="https://wa.me/917302670626"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              7302670626
            </a>
          </p>
          <p className="text-xl text-white">
            📧 <span className="text-gray-300">Email:</span>{' '}
            <a href="mailto:techsol626@gmail.com" className="text-blue-400 underline">
              techsol626@gmail.com
            </a>
          </p>
        </div>

        <a
          href="https://wa.me/917302670626"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-xl" />
          📲 Register via WhatsApp
        </a>
      </div>
    </section>
  );
}
