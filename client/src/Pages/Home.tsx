import React, {useEffect} from 'react';
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import '../Css/Home.css'
import logoNormal from '../Assets/logo450x450.png'
// @ts-ignore
import WOW from 'wowjs';

const Home: React.FC = () => {
    useEffect(() => {
      new WOW.WOW({
        live: false,
      }).init();
    }, []);

    return (
      <div>
        <Segment id="mainCover" vertical textAlign="center">
          <Container className="content">
            <Header id="title" as="h1">
              Timeless.
            </Header>
            <Image id="mainImg" src={logoNormal} />

            <blockquote id="time-phrase">
              The two most powerful warriors are patience and time.
              <span>Leo Tolstoy</span>
            </blockquote>
            <Button id="btnMain" size="huge" as={Link} to="/login">
              Get Started
            </Button>
          </Container>
          <Segment id="mainCover" vertical as="footer">
            Timeless 2021 ®, by{" "}
            <a href="https://github.com/joacof98">@joacof98</a>.
          </Segment>
        </Segment>
      </div>
    );
}

export default Home;