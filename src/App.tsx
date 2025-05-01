import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-100">
      {" "}
      <NavBar></NavBar>
      <div className="min-h-screen max-w-screen-md bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        {" "}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            {" "}
            //
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                    Vite + React + Tailwind
                  </h1>
                  <div className="text-center">
                    <button
                      onClick={() => setCount((count) => count + 1)}
                      className="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-full shadow-sm hover:bg-blue-600 transition-colors duration-200"
                    >
                      Count is {count}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
