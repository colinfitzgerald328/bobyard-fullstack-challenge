import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import * as API from "./api/api";
import "./App.css";

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: "",
      addingNewComment: false,
    };
  }

  componentDidMount() {
    API.getComments((data) => {
      this.setState({ comments: data.comments });
    });
  }

  editComment(comment_id, text) {
    var currentComments = this.state.comments;
    for (var i = 0; i < currentComments.length; i++) {
      if (currentComments[i].id === comment_id) {
        currentComments[i].text = text;
      }
    }
    this.setState({ comments: currentComments });
    API.editComment(comment_id, text, (data) => {
      if (data["operation"] === "success") {
        API.getComments((data) => {
          // setComments(data.comments);
        });
      }
    });
  }

  addComment(author, text, image) {
    this.setState({ addingNewComment: true });
    API.addComment(author, text, image, (data) => {
      API.getComments((data) => {
        this.setState({
          comments: data.comments,
          addingNewComment: false,
          newComment: "",
        });
      });
    });
  }

  deleteComment(comment_id) {
    API.deleteComment(comment_id, (data) => {
      API.getComments((data) => {
        this.setState({ comments: data.comments });
      });
    });
  }

  setNewComment(text) {
    this.setState({ newComment: text });
  }

  render() {
    const commentsMap = this.state.comments.map((comment) => {
      return (
        <div key={comment.id} className="chatCell">
          <div className="topItemsHolder">
            <div className="profileImageHolder">
              <img className="profileImage" src={comment.image} alt="profile" />
            </div>
            <div className="name">{comment.author}</div>
            <div className="rightItems">
              <div
                onClick={() => {
                  this.deleteComment(comment.id);
                }}
                className="menu"
              >
                <DeleteOutlineIcon sx={{ fontSize: "25px", color: "red" }} />
              </div>
              <div className="likes">
                <FavoriteBorderIcon sx={{ marginRight: "3px" }} />{" "}
                {comment.likes}
              </div>
            </div>
          </div>
          <div className="commentTextHolder">
            <TextareaAutosize
              className="commentText"
              value={comment.text}
              onChange={(event) => {
                this.editComment(comment.id, event.target.value);
              }}
            />
          </div>
        </div>
      );
    });
    return (
      <div className="mainBackground">
        <div className="label">Comments</div>
        <div className="chatCellHolder">{commentsMap}</div>
        <div className="addComment">
          <input
            className="addCommentText"
            placeholder="Add a comment..."
            value={this.state.newComment}
            onChange={(event) => {
              this.setNewComment(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.addComment(
                  "Admin",
                  this.state.newComment,
                  "https://www.w3schools.com/howto/img_avatar.png",
                );
              }
            }}
          />
          <SendIcon
            onClick={() => {
              this.addComment(
                "Admin",
                this.state.newComment,
                "https://www.w3schools.com/howto/img_avatar.png",
              );
            }}
            className="sendButton"
            sx={{ fontSize: "25px" }}
          />
        </div>
      </div>
    );
  }
}
