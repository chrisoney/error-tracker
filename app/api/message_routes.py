from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@message_routes.route('/')
@login_required
def messages():
    """
    Queries for and returns all messages
    """
    print("-------------", current_user, "----------------")
    messages = Message.query.all()
    return {
      "messages": [message.to_dict() for message in messages
                  if message.sender == current_user
                  or message.recipient == current_user
                  ]
      }

@message_routes.route('/', methods=['POST'])
@login_required
def new_message():
  """
  Adds a new message
  """
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  form['sender_id'].data = current_user.id
  if form.validate_on_submit():
    message = Message(
      body=form.data['body'],
      sender_id=form.data['sender_id'],
      recipient_id=form.data['recipient_id'] 
    )
    db.session.add(message)
    db.session.commit()
    return { "message": message.to_dict() }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400