export default function TrustedCompanies() {
  return (
    <section className="py-16 bg-gradient-to-b from-tech-dark to-tech-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400 mb-12 text-lg">Trusted by companies of all sizes</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Company Logos */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">Walmart</div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400/20 to-blue-400/50 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-orange-400">FedEx</div>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-400/20 to-orange-400/50 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-red-400">Airbnb</div>
              <div className="w-12 h-1 bg-gradient-to-r from-red-400/20 to-red-400/50 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-orange-500">HubSpot</div>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500/20 to-orange-500/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}