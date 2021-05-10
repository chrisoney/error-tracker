from app.models import db, Message, User

def seed_messages():
    chris = User.query.filter_by(username='Chris').first()
    jesse = User.query.filter_by(username='Jesse').first()
    alec = User.query.filter_by(username='Alec').first()
    
    message_one = Message(
      body='This is the first message',
      sender=chris,
      recipient=jesse
      )
    message_two = Message(
      body='This is the second message',
      sender=jesse,
      recipient=chris
      )
    message_three = Message(
      body='This is the third message',
      sender=chris,
      recipient=alec
      )
    

    db.session.add(message_one)
    db.session.add(message_two)
    db.session.add(message_three)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_messages():
    db.session.execute('TRUNCATE messages CASCADE;')
    db.session.commit()
