import { Shield, Upload, Search, LogOut } from "lucide-react"

function Sidebar() {

  return (

    <div className="w-64 bg-slate-900 border-r border-slate-700 p-6">

      <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">

        <Shield size={24} />

        StegoLab

      </h2>

      <nav className="mt-10 space-y-6">

        <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 cursor-pointer">

          <Upload size={20} />

          Encode

        </div>

        <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 cursor-pointer">

          <Search size={20} />

          Analyze

        </div>

        <div className="flex items-center gap-3 text-gray-300 hover:text-red-400 cursor-pointer">

          <LogOut size={20} />

          Logout

        </div>

      </nav>

    </div>

  )
}

export default Sidebar