from flask import request
from flask_socketio import SocketIO, emit
from flask_login import current_user
import os
from .models import User, db


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

users = {}

@socketio.on('connected', namespace="/private")
def on_join(data):
    users[data["userId"]] = request.sid
    print(users)
    emit('connected', users, broadcast=True)

@socketio.on('disconnect', namespace="/private")
def on_leave():
    del users[current_user.id]
    emit('connected', users, broadcast=True)

# handle chat messages
@socketio.on("chat", namespace="/private")
def handle_chat(data):
    # users[data["senderId"]] = request.sid
    data['sender_id'] = data["senderId"]
    emit("chat", data, room=request.sid)
    if data["recipientId"] in users:
        emit("chat", data, room=users[data["recipientId"]])