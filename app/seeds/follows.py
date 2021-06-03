from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_follows():

    chris = User.query.filter_by(username='Chris').first()
    jm = User.query.filter_by(username='JM').first()
    senyo = User.query.filter_by(username='Senyo').first()
    olivia = User.query.filter_by(username='Olivia').first()
    
    jm.followers.append(chris)
    jm.followers.append(olivia)
    senyo.followers.append(olivia)
    olivia.followers.append(senyo)
    

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the follows table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_follows():
    db.session.execute('TRUNCATE follows CASCADE;')
    db.session.commit()
