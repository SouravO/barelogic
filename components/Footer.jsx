export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-6">
      <div className="mx-auto max-w-6xl text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Barelogic. Built with Next.js and Tailwind CSS.
      </div>
    </footer>
  );
}
