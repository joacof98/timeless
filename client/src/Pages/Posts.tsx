import React, { useContext, useEffect, useState } from "react";
import {
  Segment,
  Grid,
  Card,
  Image,
  Input,
  Dimmer,
  Loader
} from "semantic-ui-react";
import "../Css/Posts.css";
import { AuthContext } from "../util/auth";
import { getAllPosts } from "../util/requests";

import PostCard from '../Components/PostCard';

const Posts: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    async function getPosts() {
      setLoader(true)
      const posts = await getAllPosts();
      setLoader(false)
      setPosts(posts);
    }
    getPosts();
  });

  return (
    <div>
      <Segment id="habitsCover">
        <Grid container id="content">
          <Grid.Row style={{ backgroundColor: "#e6e0b2" }}>
            <Grid.Column computer={9} mobile={16}>
              {loader && posts.length === 0 && (
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              )}
              {user && (
                <Segment fluid raised>
                  <Image
                    src={user.imageUrl}
                    circular
                    height="45px"
                    width="45px"
                    style={{ float: "left" }}
                  />
                  <Input
                    fluid
                    icon="pencil alternate"
                    iconPosition="left"
                    placeholder="Create new post..."
                    style={{ "margin-left": "60px" }}
                  />
                </Segment>
              )}
              {posts.map((post) => (
                <PostCard key={post._id} post={post} user={user} />
              ))}
            </Grid.Column>

            <Grid.Column computer={7} mobile={16}>
              <Card fluid>aca info</Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Posts;