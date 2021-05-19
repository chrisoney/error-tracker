from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import answer, db, Answer, Image
from app.forms import AnswerForm
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



@answer_routes.route('/', methods=['POST'])
@login_required
def new_answer():
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
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    urls.append(upload["url"])

  form = AnswerForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      answer = Answer( 
        description=form.data['description'],
        user=current_user,
        error_id=form.data['error_id'] 
        )
      db.session.add(answer)
      for new_url in urls:
        image = Image(url=new_url, parent_type='error')
        answer.images.append(image)

      db.session.commit()
      return { "answer": answer.to_dict() }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400