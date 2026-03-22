import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white text-black px-2">
      
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-sm mb-4">Page Not Found</p>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 py-1 text-sm"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-3 py-1 text-sm"
        >
          Go Home
        </button>
      </div>

    </div>
  );
};

export default Error;