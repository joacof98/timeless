import React, {MouseEvent, useEffect, useState, useContext} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {AuthContext} from '../util/auth';
import {followProfileUser} from '../util/requests'

const FollowButton: React.FC<{userInfo: UserInfo}> = ({userInfo}) => {
  const [follow, setFollow] = useState<Boolean>(false)
  const {user} = useContext(AuthContext)

  const followUser = async (e: MouseEvent) => {
    await followProfileUser(userInfo.username)
  }

  useEffect(() => {
    if (
      user &&
      userInfo.followers.find(
        (follower: any) => follower.username === user.username
      )
    ) {
      setFollow(true);
    } else setFollow(false);
  }, [userInfo, user]);

  const btn =
    !user || user.username === userInfo.username ? null : !follow ? (
      <Button id="btnFollow" onClick={followUser}>
        <Icon name="add user" />
        Follow
      </Button>
    ) : (
      <Button style={{ "background-color": "#D9424B" }} onClick={followUser}>
        <Icon name="user x" />
        Unfollow
      </Button>
    );

  return btn;
}

export default FollowButton;