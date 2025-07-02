import { useRouteError } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

function Error() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf9f3] text-center px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-xl w-full">
        <div className="flex flex-col items-center text-[#b88c2c] mb-4">
          <FiAlertTriangle className="text-5xl mb-2" />
          <h1 className="text-2xl font-semibold mb-1">Oops! Something went wrong.</h1>
          <p className="text-gray-600 text-sm mb-4">
            We're sorry for the inconvenience. Please try again later.
          </p>
        </div>

        {error && (
          <div className="bg-[#fef6e7] border border-[#f3d9a4] text-[#91542b] rounded-md px-4 py-3 text-left text-sm">
            <strong>Error:</strong> {error.data || error.message}
          </div>
        )}

        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-[#91542b] text-white px-5 py-2 rounded-md hover:bg-[#7a3e21] transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;
