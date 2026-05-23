import smtplib
import socket

socket.setdefaulttimeout(20)

server = smtplib.SMTP('74.125.69.109', 587)

print("connected")
server.starttls()

print("TLS OK")
server.quit()