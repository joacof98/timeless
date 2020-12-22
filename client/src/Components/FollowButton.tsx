import React, {MouseEvent, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {followProfileUser} from '../util/requests'

const FollowButton: React.FC<{username: String}> = ({username}) => {
  const [follow, setFollow] = useState<Boolean>(false)

  const followUser = async (e: MouseEvent) => {
    setFollow(!follow)
    
  
    const res = await followProfileUser(username)
    console.log(res)
  }

  return (
    <Button id="btnFollow" onClick={followUser}>
      <Icon name="add user" />
      Follow
    </Button>
  );
}

export default FollowButton;