
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

# Load .env
load_dotenv()
EMAIL_USER = os.getenv("MY_EMAIL")
EMAIL_PASS = os.getenv("GMAIL_PASS")

app = Flask(__name__)
CORS(app)  # allow fetch from frontend

@app.route("/")
def home():
    return render_template("index.html")  # optional, just a test route

@app.route("/contact", methods=["POST"])
def contact():
    try:
        # Get JSON from JS
        data = request.get_json(silent=True) or {}
        print(data)
        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")

        # Validate input
        if not name or not email or not subject or not message:
            return jsonify({"status": "error", "message": "All fields are required"}), 400

        # Prepare email
        body = f"Subject: {subject}\n\nMessage from {name} ({email}):\n\n{message}"
        print(body)
        msg = MIMEText(body)
        print(msg)
        msg['Subject'] = f"New Contact Message: {subject}"
        msg['From'] = EMAIL_USER
        msg['To'] = EMAIL_USER

        # Send email via Gmail SMTP
        try:
            server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
            print(server)

            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
            print(server.send_message(msg))
            server.quit()
        except Exception as smtp_error:
            print("SMTP error:", smtp_error)
            return jsonify({"status": "error", "message": "Failed to send message"}), 500

        # Success
        return jsonify({"status": "success", "message": "Message sent!"})

    except Exception as e:
        print("Error in /contact:", e)
        return jsonify({"status": "error", "message": "Failed to send message"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host = "0.0.0.0", port = port)











# from flask import Flask, request, render_template, jsonify
# from flask_cors import CORS
# import smtplib
# import os
# from email.mime.text import MIMEText
# from dotenv import load_dotenv

# load_dotenv()

# EMAIL_USER = os.getenv('MY_EMAIL')
# EMAIL_PASS = os.getenv("GMAIL_PASS")

# app = Flask(__name__)
# CORS(app)

# @app.route("/")
# def home():
#     return render_template("index.html")

# @app.route("/contact",  methods= ["POST"])
# def contact():
#     try:
#         data = request.get_json(silent = True)
#         name = request.get("name")
#         email = data.get("email")
#         subject = data.get("subject")
#         message = data.get("message")

#         if not name or not email or not subject or not message:
#             return jsonify({"status": "error", "message" : "All fields are required"}), 400
        
#         body = f"Message from {name} ({email}):\n\n{message}"
#         msg = MIMEText(body)
#         msg['subject'] = "New contact Message"
#         msg['From'] = EMAIL_USER
#         msg['To'] = EMAIL_USER

#         try:
#             server = smtplib.SMTP("smtp.gmail.com", 587)
#             server.starttls()
#             server.login(EMAIL_USER, EMAIL_PASS)
#             server.send_message(msg)
#             server.quit()
#         except Exception as smtp_error:
#             print(" SMTP error in /contact:", smtp_error)
#             return jsonify({"status": "success", "message" : "Message Sent!"}), 500
        
#     except Exception as e:
#         print("error in /contact:", e)
#         return jsonify({"status": "error", "message" : "failed to send message"}), 500

# @app.route("/resume")
# def resume():
#     return app.send_static_file("documents/Internship_Resume_Phoenix.pdf")

# if __name__ == "__main__":
#     app.run(debug=True)