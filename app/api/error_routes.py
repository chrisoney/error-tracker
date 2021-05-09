from flask import Blueprint, request
from flask_login import login_required
from app.models import Error, db
from app.forms import ErrorForm

error_routes = Blueprint('errors', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@error_routes.route('/')
@login_required
def errors():
  """
  Sends back all of the erro data
  """
  errors = Error.query.all()
  return {"errorsArray": [error.to_dict() for error in errors]}


@error_routes.route('/', methods=['POST'])
@login_required
def new_error():
  """
  Creates a new error
  """
  form = ErrorForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      error = Error( 
        title=form.data['title'],
        description=form.data['description'],
        user_id=form.data['user_id'],
        module_id=form.data['module_id'] 
        )
      db.session.add(error)
      db.session.commit()
      return { "error": error.to_dict() }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400