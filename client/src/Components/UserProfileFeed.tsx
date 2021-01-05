import React, { useEffect, useState } from "react";
import {
  Segment,
  Item,
  Label,
  Icon,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { getPostsByUsername } from "../util/requests";
import "../Css/Profile.css";

const moment = require("moment");
const UserProfileFeed: React.FC<{ username: String }> = ({ username }) => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loader, setLoader] = useState<Boolean>(false)

  useEffect(() => {
    async function getPosts() {
      setLoader(true)
      const res = await getPostsByUsername(username);
      setLoader(false)
      setPosts(res);
    }
    getPosts();
  }, [username]);

  return (
    <div>
      {loader && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
      {posts.length > 0 ? (
        <div>
          <Header as="h1" id="feedTitle">
            {username} "recent" Posts:{" "}
          </Header>
          <Segment raised id="feedCover">
            <Item.Group divided>
              {posts.map((post) => (
                <Item key={post.title}>
                  {post.imageUrl && <Item.Image size="tiny" src={post.imageUrl} />}
                  <Item.Content>
                    <Item.Header as="a">{post.title}</Item.Header>
                    <Item.Meta>
                      <span className="cinema">
                        {moment(post.createdAt).fromNow()}
                      </span>
                    </Item.Meta>
                    <Item.Description>
                      {post.description && post.description.substr(0, 87) + "..."}
                    </Item.Description>
                    <Item.Extra>
                      <Label>
                        <Icon name="like" /> {post.likes.length}
                      </Label>
                      <Label>
                        <Icon name="comment" /> {post.comments.length}
                      </Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Segment>
        </div>
      ) : (
        <Header as="h1" id="feedTitle" style={{ "margin-top": "300px" }}>
          Oops, {username} doesnt have posts yet... come back another month.
        </Header>
      )}
    </div>
  );
};

export default UserProfileFeed;
