import { useState } from "react"
import Navbar from "../components/Navbar"
import ActionPanel from "../components/ActionPanel"
import ResultPanel from "../components/ResultPanel"

export default function Dashboard() {

  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [action, setAction] = useState("")
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {

    setFile(e.target.files[0])

  }

  const processFile = async () => {

    if (!file) {

      alert("Upload file first")
      return

    }

    if (!action) {

      alert("Select action")
      return

    }

    const formData = new FormData()

    formData.append("file", file)

    let url = ""

    if (action === "encode") {

      url = "http://127.0.0.1:5000/encode"

      formData.append("message", message)

    }

    else if (action === "decode") {

      url = "http://127.0.0.1:5000/decode"

    }

    else if (action === "analyze") {

      url = "http://127.0.0.1:5000/analyze"

    }

    try {

      const response = await fetch(url, {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      console.log("Server Response:", data)

      if (action === "encode") {

        setResult({
          status: "Encoding Complete",
          message: "File saved as: " + data.file,
          risk: "N/A"
        })

        // Auto download encoded file

        const downloadUrl =
          "http://127.0.0.1:5000/download/" + data.file

        const link = document.createElement("a")

        link.href = downloadUrl
        link.setAttribute("download", data.file)

        document.body.appendChild(link)

        link.click()

        link.remove()

      }

      else if (action === "decode") {

        setResult({
          status: "Decoded Successfully",
          message: data.message,
          risk: "N/A"
        })

      }

      else if (action === "analyze") {

        setResult({
          status: "Analysis Complete",
          message: "Hidden data detection finished",
          risk: data.risk + " (" + data.score + "%)"
        })

      }

    }

    catch (error) {

      console.error(error)

      setResult({
        status: "Error",
        message: "Server connection failed",
        risk: "Unknown"
      })

    }

  }

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-cyan-400 mb-6">

          Steganography Forensics Dashboard

        </h1>

        {/* File Upload */}

        <div className="border-2 border-dashed border-cyan-500 p-8 rounded-xl mb-6">

          <input
            type="file"
            onChange={handleFileChange}
          />

          {file && (

            <p className="text-green-400 mt-2">

              Selected: {file.name}

            </p>

          )}

        </div>

        {/* Action Panel */}

        <ActionPanel

          action={action}

          setAction={setAction}

          message={message}

          setMessage={setMessage}

          processFile={processFile}

        />

        {/* Result Panel */}

        <ResultPanel result={result} />

      </div>

    </div>

  )

}