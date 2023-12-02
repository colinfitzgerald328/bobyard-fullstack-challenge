from sqlalchemy import create_engine, update, Column, String, Integer, BigInteger, DateTime, desc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime


Base = declarative_base()

class Comment(Base):
  __tablename__ = 'comments'
  id = Column(BigInteger, primary_key=True)
  author = Column(String)
  text = Column(String)
  date = Column(DateTime, default=datetime.utcnow)
  likes = Column(Integer, default=0)
  image = Column(String)

engine = create_engine("cockroachdb://colinfitzgerald:Q-tOc44TPZrB9xnYUrEx5Q@lilac-jackal-3954.g95.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full")
Base.metadata.bind = engine

# Create a session factory
Session = sessionmaker(bind=engine)

def update_comment(new_text, comment_id):
    """
    Updates a comment with the given text.
    """
    try:
        session = Session()
        stmt = update(Comment).where(Comment.id == int(comment_id)).values(text=new_text)
        session.execute(stmt)
        session.commit()

    except Exception as e:
        print(e)
        session.rollback()
        return False

    finally:
        # Close the session
        session.close()

    return True



def add_comment(author, text, image):
  """
  Adds a new comment to the database.
  """
  try:
      session = Session()
      new_comment = Comment(author=author, text=text, image=image)
      # Add the new comment to the session
      session.add(new_comment)
      session.commit()

      return True

  except Exception as e:
      print(e)
      # Handle the error if necessary
      session.rollback()
      session.close()
      return False

  finally:
      # Close the session
      session.close()


def delete_comment(comment_id):
  """
  Deletes a comment from the database.
  """
  try:
      session = Session()
      comment = session.query(Comment).filter(Comment.id == int(comment_id)).first()

      if comment:
          # Delete the comment if it exists
          session.delete(comment)
          session.commit()
          return True
      else:
          print("comment not found")
          session.rollback()
          return False

  except Exception as e:
      print(e)
      # Handle the error
      return False

  finally:
      # Close the session
      session.close()


def get_comments():
  """
  Returns all comments from the database.
  """
  comments = []
  try:
      session = Session()
      rows = session.query(Comment).order_by(desc(Comment.date)).all()
  
      for comment in rows:
          comments.append({
              "id": str(comment.id),
              "author": comment.author,
              "text": comment.text,
              "date": comment.date,
              "likes": comment.likes,
              "image": comment.image
          })
  
  except Exception as e:
      print(e)
      # Handle the error if necessary
      session.rollback()
      return None
  finally:
      # Close the session
      session.close()
  
  return comments