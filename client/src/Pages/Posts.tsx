import React, { useContext, useEffect, useState } from "react";
import {
  Segment,
  Grid,
  Image,
  Input,
  Dimmer,
  Loader
} from "semantic-ui-react";
import "../Css/Posts.css";
import { AuthContext } from "../util/auth";
import { getAllPosts } from "../util/requests";
import { Link } from 'react-router-dom'

import PostCard from '../Components/PostCard';
import TopUsers from '../Components/TopUsers';

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
  }, []);

  return (
    <div>
      <Segment id="postsCover">
        <Grid container id="content">
          <Grid.Row>
            <Grid.Column computer={10} mobile={16}>
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
                    as={Link} to='/create'
                  />
                </Segment>
              )}
              {posts.map((post) => (
                <PostCard key={post._id} post={post} user={user} />
              ))}
            </Grid.Column>

            <Grid.Column computer={6} mobile={16}>
              <TopUsers />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Posts;
