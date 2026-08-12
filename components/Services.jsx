export default function Services() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold text-slate-900">Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Design</h3>
            <p className="mt-3 text-slate-600">Simple, modern interfaces built for clarity and usability.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Development</h3>
            <p className="mt-3 text-slate-600">Scalable front-end experiences using Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
