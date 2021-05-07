from app.models import db, Module

# Adds a demo user, you can add other users here if you want
def seed_modules():

    seven = Module(name='Module 7')
    four = Module(name='Module 4')

    db.session.add(seven)
    db.session.add(four)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the modules table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_modules():
    db.session.execute('TRUNCATE modules CASCADE;')
    db.session.commit()
