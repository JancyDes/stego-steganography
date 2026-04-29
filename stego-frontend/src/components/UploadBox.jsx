import { useState } from "react"
import { UploadCloud } from "lucide-react"

function UploadBox({ setFile }) {

  const [fileName, setFileName] = useState("")

  const handleFile = (file) => {
    setFile(file)
    setFileName(file.name)
  }

  const handleChange = (e) => {
    handleFile(e.target.files[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (

    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-cyan-600 p-10 rounded-xl text-center hover:bg-slate-900 transition"
    >

      <UploadCloud size={40} className="mx-auto text-cyan-400 mb-4" />

      <p className="text-gray-400">

        Drag & Drop Image or Audio Here

      </p>

      <p className="text-sm text-gray-500 mt-2">

        or click to browse

      </p>

      <input
        type="file"
        className="mt-4"
        onChange={handleChange}
      />

      {fileName && (

        <p className="mt-4 text-green-400">

          Selected: {fileName}

        </p>

      )}

    </div>

  )
}

export default UploadBox