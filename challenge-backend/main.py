from flask import Flask, request
from flask_cors import CORS
import functions 
app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
  return 'Hello, World!'


@app.route('/comments/edit', methods=["POST"])
def edit_comment():
  params = request.json 
  text = params.get("text")
  comment_id = params.get("comment_id")

  success = functions.update_comment(new_text=text, comment_id=comment_id)

  if not success: 
    return {
      "operation": "error", 
      "description": "Failed to update comment"
    }
  else: 
    return {
      "operation": "success"
    }


@app.route('/comments/add', methods=["POST"])
def add_comment():
  params = request.json 
  author = params.get("author")
  text = params.get("text")
  image = params.get("image")

  success = functions.add_comment(author=author, text=text, image=image)

  if not success: 
    return {
      "operation": "error", 
      "description": "Failed to add comment"
    }
  else: 
    return {
      "operation": "success"
    }


@app.route('/comments/delete', methods=["POST"])
def delete_comment():
  params = request.json 
  comment_id = params.get("comment_id")

  success = functions.delete_comment(comment_id=comment_id)

  if not success: 
    return {
      "operation": "error", 
      "description": "Failed to delete comment"
    }
  else: 
    return {
      "operation": "success"
    }


@app.route('/comments', methods=["GET"])
def get_comments():
  
  comments = functions.get_comments()

  if not comments: 
    return {
      "operation": "error", 
      "description": "Failed to get comments"
    }
  else: 
    return {
      "operation": "success", 
      "comments": comments
    }

  




app.run(host='0.0.0.0', port=8080, debug=True)
