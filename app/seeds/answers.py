from app.models import db, Error, User, Answer

def seed_answers():
    chris = User.query.filter_by(username='Chris').first()
    jesse = User.query.filter_by(username='Jesse').first()
    error_one = Error.query.first()
    ans_one = Answer(
      description="ANSWER ONE",
      user=chris,
      error=error_one
      )
    ans_two = Answer(
      description="ANSWER TWO",
      user=jesse,
      error=error_one
      )
    ans_three = Answer(
      description="ANSWER THREE",
      user=chris,
      error=error_one
      )
    ans_four = Answer(
      description="ANSWER FOUR",
      user=jesse,
      error=error_one
      )
    ans_five = Answer(
      description="ANSWER FIVE",
      user=chris,
      error=error_one
      )
    ans_six = Answer(
      description="ANSWER SIX",
      user=jesse,
      error=error_one
      )

    db.session.add(ans_one)
    db.session.add(ans_two)
    db.session.add(ans_three)
    db.session.add(ans_four)
    db.session.add(ans_five)
    db.session.add(ans_six)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the answers table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_answers():
    db.session.execute('TRUNCATE answers CASCADE;')
    db.session.commit()
