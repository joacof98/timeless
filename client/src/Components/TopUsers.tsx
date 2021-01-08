import React, { useEffect, useState } from "react";
import { Card, Divider, Grid, Header, Icon, Segment } from "semantic-ui-react";
import "../Css/Posts.css";
import { top5Followers } from "../util/requests";

const TopUsers: React.FC = () => {
  const [top, setTop] = useState([]);

  useEffect(() => {
    async function getTop5() {
      const res = await top5Followers();
      setTop(res);
    }
    getTop5();
  }, []);

  return (
    <div>
      <Card fluid>
        <Card.Header textAlign="center">
          <Segment id="postBtn" style={{ color: "white" }}>
            <Header id="postBtn" style={{ color: "white" }}>
              <Icon name="eye" /> Top 5 Most Followed Users
            </Header>
          </Segment>
        </Card.Header>
        <Card.Content>
          <Grid>
            <Grid.Row columns={2} textAlign="center">
              <Grid.Column>
                <Header id="timeless-font">
                  <i>Username</i>
                </Header>
                {top.map((u) => (
                  <Header as="h4" id="timeless-font">
                    {u.username}
                  </Header>
                ))}
              </Grid.Column>
              <Grid.Column>
                <Header id="timeless-font">
                  <i>Followers</i>
                </Header>
                {top.map((u) => (
                  <Header as="h4" id="timeless-font">
                    {u.followers_count}
                  </Header>
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  );
};

export default TopUsers;
