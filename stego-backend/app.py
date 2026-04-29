from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from flask_bcrypt import Bcrypt
import os
from flask import send_from_directory
# Import utils
from utils.encode import encode_image
from utils.decode import decode_image
from utils.analyze import analyze_image

app = Flask(__name__)

CORS(app)

bcrypt = Bcrypt(app)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# -----------------------------
# Database Setup
# -----------------------------

def init_db():

    conn = sqlite3.connect("database.db")

    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT

        )
    """)

    conn.commit()
    conn.close()

init_db()

# -----------------------------
# Signup API
# -----------------------------

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    conn = sqlite3.connect("database.db")

    cur = conn.cursor()

    try:

        cur.execute(
            "INSERT INTO users (username,email,password) VALUES (?,?,?)",
            (username, email, hashed_password)
        )

        conn.commit()
        conn.close()

        return jsonify({"status": "success"})

    except:

        conn.close()

        return jsonify({
            "status": "error",
            "message": "Email already exists"
        })

# -----------------------------
# Login API
# -----------------------------

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    conn = sqlite3.connect("database.db")

    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE email=?",
        (email,)
    )

    user = cur.fetchone()

    conn.close()

    if user and bcrypt.check_password_hash(user[3], password):

        return jsonify({
            "status": "success",
            "username": user[1]
        })

    else:

        return jsonify({
            "status": "error",
            "message": "Invalid email or password"
        })

# -----------------------------
# Upload API
# -----------------------------

@app.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:

        return jsonify({
            "status": "error",
            "message": "No file uploaded"
        })

    file = request.files["file"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    return jsonify({
        "status": "success",
        "filename": file.filename
    })

# -----------------------------
# Encode API
# -----------------------------

@app.route("/encode", methods=["POST"])
def encode():

    file = request.files["file"]
    message = request.form["message"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    output_filename = encode_image(
        filepath,
        message
    )

    return jsonify({
        "status": "success",
        "file": output_filename
    })
# -----------------------------
# Decode API
# -----------------------------

@app.route("/decode", methods=["POST"])
def decode():

    file = request.files["file"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    message = decode_image(filepath)

    return jsonify({
        "status": "success",
        "message": message
    })
@app.route("/download/<filename>")
def download_file(filename):

    return send_from_directory(
        UPLOAD_FOLDER,
        filename,
        as_attachment=True
    )


@app.route("/analyze", methods=["POST"])
def analyze():

    if "file" not in request.files:

        return jsonify({
            "status": "error",
            "message": "No file uploaded"
        })

    file = request.files["file"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    result = analyze_image(filepath)

    return jsonify({
        "status": "success",
        "risk": result["risk"],
        "score": result["score"]
    })
# -----------------------------
# Run Server
# -----------------------------

if __name__ == "__main__":

    app.run(debug=True)