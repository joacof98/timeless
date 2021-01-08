import React, { useContext, useState, ChangeEvent } from "react";
import { Button, Card, Form, Header, Comment, Dimmer, Loader } from "semantic-ui-react";
import { AuthContext } from "../util/auth";
import '../Css/Posts.css'
import { Link } from "react-router-dom";
import { deleteComment, createComment } from "../util/requests";

const moment = require("moment");
const Comments: React.FC<{ post: PostInfo; fetchUserPost: () => void }> = ({
  post,
  fetchUserPost,
}) => {
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>('')
  
  const deleteUserComment = async (c_id: string, p_id: string) => {
    setLoader(true)
    await deleteComment(c_id, p_id);
    setLoader(false)
    fetchUserPost();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCommentInput(e.target.value);
  };

  const submitComment = async () => {
    setLoader(true)
    await createComment(commentInput, post._id)
    setLoader(false)
    fetchUserPost()
  }

  return (
    <div>
      <Header as="h2" id="titleForm">
        Comments ({post.comments.length})
      </Header>
      {loader && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
      {user && (
        <Card fluid>
          <Card.Content>
            <b>
              <p id="timeless-font" style={{ marginBottom: "5px" }}>
                Post a comment
              </p>
            </b>
            <Form onSubmit={submitComment}>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Comment..."
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  id="postBtn"
                  style={{ color: "#DCB172" }}
                  disabled={commentInput.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
      <Comment.Group size="large">
        {post.comments.map((comment: Comments) => (
          <div key={comment.createdAt}>
            <Comment>
              <Comment.Content>
                <Comment.Author as={Link} to={`/u/${comment.username}`}>
                  {comment.username}
                </Comment.Author>
                <Comment.Metadata>
                  <span>
                    <b>{moment(comment.createdAt).fromNow()}</b>
                  </span>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                  {user &&
                    (user.username === post.username ||
                      user.username === comment.username) && (
                      <Comment.Action
                        style={{ color: "#D9424B" }}
                        onClick={() => deleteUserComment(comment._id, post._id)}
                      >
                        Delete
                      </Comment.Action>
                    )}
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </div>
        ))}
      </Comment.Group>
    </div>
  );
};

export default Comments;
