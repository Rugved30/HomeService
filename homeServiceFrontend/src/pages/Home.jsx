import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to HomeService
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop solution for all home services
        </p>
        
        {user ? (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hello, {user.fullName}!
            </h2>
            <p className="text-gray-600">
              You are now logged in. Browse our services and find what you need.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get Started Today
            </h2>
            <p className="text-gray-600 mb-6">
              Register now to access our wide range of home services.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Register
              </a>
              <a
                href="/login"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Home Repairs</h3>
          <p className="text-gray-600">Professional repair services for your home needs.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">🧹</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Cleaning Services</h3>
          <p className="text-gray-600">Keep your home spotless with our cleaning experts.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Maintenance</h3>
          <p className="text-gray-600">Regular maintenance to keep everything running smoothly.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
