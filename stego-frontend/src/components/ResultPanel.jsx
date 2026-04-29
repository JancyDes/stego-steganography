function ResultPanel({ result }) {

  return (

    <div className="mt-6 bg-slate-900 p-6 rounded-xl border border-slate-700">

      <h2 className="text-xl text-cyan-400 font-semibold mb-4">

        Result

      </h2>

      {result ? (

        <div className="break-words overflow-auto max-h-40">

          <p className="text-green-400">

            Status: {result.status}

          </p>

          <p className="text-yellow-400 mt-2">

            Message: {result.message}

          </p>

          <p className="text-red-400 mt-2">

            Risk Level: {result.risk}

          </p>

        </div>

      ) : (

        <p className="text-gray-500">

          No results yet.

        </p>

      )}

    </div>

  )

}

export default ResultPanel