import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer data-gsap-text className="bg-gradient-soft text-slate-600 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <p className="font-script text-3xl bg-gradient-pink bg-clip-text text-transparent">
            Tasha&apos;s Glamour
          </p>
          <p className="mt-4 text-sm text-slate-600 max-w-xs">
            Professional nail training academy. Register with R200 and pay your training amount at
            the class.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Visit Us</h4>
          <p className="text-sm text-slate-600">296 Pretorius Street</p>
          <p className="text-sm text-slate-600">Premium Towers (next to Steers)</p>
          <p className="text-sm text-slate-600 mt-2">Registration: R200 (separate)</p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Follow</h4>
          <p className="text-sm text-slate-600">TikTok: Tasha&apos;s Glamour Training</p>
          <p className="text-sm text-slate-600">Instagram: @tashas_glamour11</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://instagram.com/tashas_glamour11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@tashasglamourtraining"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-primary"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.79a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.22Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-background/10 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Tasha&apos;s Glamour Training. All rights reserved.
      </div>
    </footer>
  );
}
