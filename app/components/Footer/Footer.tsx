const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <img
              src="/assets/Logo/protocol.svg"
              alt="Protocol"
              className="h-5 brightness-0 invert opacity-40"
            />
            <span className="text-white/35 text-xs">
              Part of the{" "}
              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors underline underline-offset-2"
              >
                IEEE
              </a>{" "}
              family.
            </span>
          </div>
          <p className="text-white/25 text-xs">
            © 2024 IEEE SRM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
