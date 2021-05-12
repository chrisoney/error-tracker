from flask import request
from flask_socketio import SocketIO, emit, join_room, leave_room
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
    print('--------------------')
    emit('connected', users, broadcast=True)

@socketio.on('disconnected', namespace="/private")
def on_leave(data):
    users[data["userId"]] = null
    print("left", '--------------', users[data["userId"]])

# handle chat messages
@socketio.on("chat", namespace="/private")
def handle_chat(data):
    users[data["senderId"]] = request.sid
    print('------------------', request.sid)
    emit("chat", data, room=request.sid)
    if data["recipientId"] in users:
        emit("chat", data, room=users[data["recipientId"]])