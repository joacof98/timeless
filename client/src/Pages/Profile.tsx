import React, {useEffect, useState} from "react";
import { Grid, Image, Header, Statistic} from "semantic-ui-react";
import {useParams} from 'react-router-dom'
import {getUser} from '../util/requests'
import '../Css/Profile.css'

import FollowButton from '../Components/FollowButton'
import UserProfileFeed from '../Components/UserProfileFeed'
const moment = require('moment');

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserInfo>({
    username: '',
    email: '',
    imageUrl: '',
    createdAt: '',
    followers: [],
    following: [],
    habits: []
  })

  useEffect(() => {
    async function getUserData() {
      const userData = await getUser(username)
      setUser(userData)
    }
    getUserData()
  }, [username, user])

  return (
    <Grid columns={2}>
      <Grid.Row style={{ height: "630px" }}>
        <Grid.Column id="profileInfoCover" computer={4} mobile={16}>
          <div className="profileCard">
            <Image
              style={{ margin: "auto" }}
              src={user.imageUrl}
              circular
              size="small"
              bordered
            />
            <Header as="h1" id="font-profile" style={{'color': '#315054'}}>
              {user.username}
            </Header>
            <b>
              <p style={{ color: "#7d7d7d" }}>
                member since: {moment(user.createdAt).fromNow()}
              </p>
            </b>

            <Statistic.Group horizontal size="mini" id="statistics">
              <Statistic color="violet">
                <Statistic.Value id="font-profile">
                  {user.followers.length}
                </Statistic.Value>
                <Statistic.Label id="font-profile">Followers</Statistic.Label>
              </Statistic>
              <Statistic color="violet">
                <Statistic.Value id="font-profile">
                  {user.following.length}
                </Statistic.Value>
                <Statistic.Label id="font-profile">Following</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>

          <FollowButton userInfo={user} />
        </Grid.Column>

        <Grid.Column id="postsInfoCover" computer={12} mobile={16}>
          <UserProfileFeed username={username} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Profile;