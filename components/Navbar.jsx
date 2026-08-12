export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white py-4 px-6 shadow-sm shadow-slate-100/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">Barelogic</div>
        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <a href="#hero" className="hover:text-slate-900">Home</a>
          <a href="#about" className="hover:text-slate-900">About</a>
          <a href="#services" className="hover:text-slate-900">Services</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
        </nav>
      </div>
    </header>
  );
}
