import RegistrationForm from '../components/auth/RegistrationForm.jsx'

function Registration() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">HomeService</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Register to discover trusted home service providers.
          </p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200 sm:p-8">
          <RegistrationForm />
        </section>
      </div>
    </main>
  )
}

export default Registration