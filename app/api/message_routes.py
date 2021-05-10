from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def messages():
    """
    Queries for and returns all messages
    """
    messages = Message.query.all()
    return {
      "messages": [message.to_dict() for message in messages
                  if message.sender == current_user
                  or message.recipient == current_user
                  ]
      }