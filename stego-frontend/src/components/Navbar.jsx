import { useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  return (

    <div className="w-60 bg-slate-900 min-h-screen p-6 border-r border-slate-700">

      <h2 className="text-xl font-bold text-cyan-400 mb-8">

        StegForensics

      </h2>

      <div className="flex flex-col gap-6">

        {/* Dashboard */}

        <button
          onClick={() => navigate("/dashboard")}
          className="text-left text-gray-300 hover:text-cyan-400 transition"
        >
          Dashboard
        </button>

        {/* History */}

        <button
          onClick={() => navigate("/history")}
          className="text-left text-gray-300 hover:text-cyan-400 transition"
        >
          Scan History
        </button>

        {/* Reports */}

        <button
          onClick={() => navigate("/reports")}
          className="text-left text-gray-300 hover:text-cyan-400 transition"
        >
          Reports
        </button>

        {/* Logout */}

        <button
          onClick={() => navigate("/")}
          className="text-left text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>

      </div>

    </div>

  )

}