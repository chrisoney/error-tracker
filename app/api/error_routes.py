from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Error, Image, Answer
from app.forms import ErrorForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
  Sends back all of the error data
  """
  errors = Error.query.all()
  return {"errorsArray": { error.id: error.to_dict() for error in errors}}

@error_routes.route('/', methods=['POST'])
@login_required
def new_error():
  """
  Creates a new error
  """
  images = request.files.getlist("images[]")
  urls = []

  for img in images:
    if not allowed_file(img.filename):
      return {"errors": "file type not permitted"}, 400
    img.filename = get_unique_filename(img.filename)
    upload = upload_file_to_s3(img)
    print(upload)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    urls.append(upload["url"])

  form = ErrorForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      error = Error( 
        title=form.data['title'],
        description=form.data['description'],
        user=current_user,
        module_id=form.data['module_id'] 
        )
      db.session.add(error)
      for new_url in urls:
        image = Image(url=new_url, parent_type='error')
        error.images.append(image)

      db.session.commit()
      return { "error": error.to_dict() }
  print(validation_errors_to_error_messages(form.errors))
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@error_routes.route('/<int:id>')
# @login_required
def get_single_error(id):
  """
  Sends back error information
  """
  error = Error.query.get(id)
  return {"error": error.to_dict() }

@error_routes.route('/<int:id>/answers')
# @login_required
def get_error_answers(id):
  """
  Sends back all of the answers for a certain error
  """
  answers = Answer.query.filter_by(error_id=id)
  return {"answers": {answer.id:answer.to_dict() for answer in answers}}

