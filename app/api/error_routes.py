from flask import Blueprint
from flask_login import login_required
from app.models import Error

error_routes = Blueprint('errors', __name__)

@error_routes.route('/')
@login_required
def errors():
  errors = Error.query.all()
  return {"errorsArray": [error.to_dict() for error in errors]}