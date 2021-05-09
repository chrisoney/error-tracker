from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Answer, Image
# from app.forms import ErrorForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

answer_routes = Blueprint('answers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@answer_routes.route('/')
@login_required
def answers():
  """
  Sends back all of the answer data
  """
  answers = Answer.query.all()
  return {"answers": [answer.to_dict() for answer in answers]}
