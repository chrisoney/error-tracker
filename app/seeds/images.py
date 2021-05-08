# https://w3i7z3h8.stackpathcdn.com/wp-content/uploads/2020/07/Training-Time-Aug2020-GR-with-ball-1920x1040.jpg

# https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/129979404/original/3ac0f520865d60efadc145def33b24355a2b1df9/turn-your-cat-into-a-sad-cat.jpg

from app.models import db, Image, Error

def seed_images():
  error = Error.query.first()
  
  dog_pic = Image(url='https://w3i7z3h8.stackpathcdn.com/wp-content/uploads/2020/07/Training-Time-Aug2020-GR-with-ball-1920x1040.jpg',
  parent_type='error')
  cat_pic = Image(url='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/129979404/original/3ac0f520865d60efadc145def33b24355a2b1df9/turn-your-cat-into-a-sad-cat.jpg',
  parent_type='error')

  error.images.append(dog_pic)
  error.images.append(cat_pic)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the images table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_images():
    db.session.execute('TRUNCATE images CASCADE;')
    db.session.commit()
