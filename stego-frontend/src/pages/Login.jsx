import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (data.status === "success") {

        alert("Login successful")

        navigate("/dashboard")

      } else {

        alert(data.message)

      }

    } catch (error) {

      alert("Server error")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 p-8 rounded-2xl shadow-lg w-96 border border-cyan-500"
      >

        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          Stego Forensics Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-gray-400">

          Don't have an account?

          <Link
            to="/signup"
            className="text-cyan-400 ml-2"
          >
            Signup
          </Link>

        </p>

      </motion.div>

    </div>

  )

}

export default Login