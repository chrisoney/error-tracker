from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Module

subscription_routes = Blueprint('subscriptions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@subscription_routes.route('/')
@login_required
def modules_subscribed():
  """
  Sends back all of the subscription data
  """
  user = User.query.get(current_user.id)
  return {"subscriptions": [module.to_dict() for module in user.modules]}

