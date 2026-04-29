import { useState } from "react"

function ActionPanel({ action, setAction, message, setMessage, processFile }) {

  return (

    <div className="mt-6 bg-slate-900 p-6 rounded-xl border border-slate-700">

      <h2 className="text-xl text-cyan-400 font-semibold mb-4">

        Select Action

      </h2>

      <div className="flex gap-4">

        <button
          onClick={() => setAction("encode")}
          className={`px-4 py-2 rounded-lg ${
            action === "encode"
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          Encode
        </button>

        <button
          onClick={() => setAction("decode")}
          className={`px-4 py-2 rounded-lg ${
            action === "decode"
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          Decode
        </button>

        <button
          onClick={() => setAction("analyze")}
          className={`px-4 py-2 rounded-lg ${
            action === "analyze"
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          Analyze
        </button>

      </div>

      {action === "encode" && (

        <input
          type="text"
          placeholder="Enter secret message..."
          className="mt-4 w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

      )}

      <button
        onClick={processFile}
        className="mt-6 w-full bg-purple-500 hover:bg-purple-600 p-3 rounded-lg font-semibold"
      >
        Process File
      </button>

    </div>

  )
}

export default ActionPanel