import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (data.status === "success") {

        alert("Signup successful")

        navigate("/")

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
        className="bg-slate-900 p-8 rounded-2xl shadow-lg w-96 border border-purple-500"
      >

        <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
          Create Account
        </h2>

        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600"
          />

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
            className="w-full bg-purple-500 hover:bg-purple-600 p-3 rounded-lg font-semibold"
          >
            Signup
          </button>

        </form>

        <p className="text-center mt-4 text-gray-400">

          Already have account?

          <Link
            to="/"
            className="text-purple-400 ml-2"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </div>

  )

}

export default Signup