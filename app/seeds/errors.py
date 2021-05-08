from app.models import db, Error, User, Module

def seed_errors():
    chris = User.query.filter_by(username='Chris').first()
    jesse = User.query.filter_by(username='Jesse').first()
    four = Module.query.filter_by(name='Module 4').first()
    seven = Module.query.filter_by(name='Module 7').first()
    error_one = Error(
      title='This error has been giving me a lot of trouble',
      description="Consistently getting the following error: Cannot read property 'replace' of undefined",
      user_id=chris.id,
      module_id=four.id
      )
    error_two = Error(
      title='Has anybody seen this error before?',
      description="Object of type '<SQLAlchemy model>' is not JSON-serializable '||' expected ... but got a list instead",
      user_id=jesse.id,
      module_id=seven.id
      )

    db.session.add(error_one)
    db.session.add(error_two)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the errors table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_errors():
    db.session.execute('TRUNCATE errors CASCADE;')
    db.session.commit()
