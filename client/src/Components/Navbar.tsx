import React, { useState, MouseEvent } from "react";
import { Menu, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logoMini from '../Assets/logo50x50.png';

const Navbar: React.FC = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState<String>(path);

  const handleItemClick = (e: MouseEvent, ac: String) => {
    setActiveItem(ac)
  }

  const menuBar = (
    <Container>
      <Menu pointing secondary size="massive" >
        <Image
          src={logoMini}
          onClick={() => setActiveItem("home")}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right" id='timeless-font'>
          <Menu.Item
            name="Posts"
            active={activeItem === "posts"}
            onClick={(e) => handleItemClick(e, "posts")}
            as={Link}
            to="/posts"
          />

          <Menu.Item
            name="LogIn"
            active={activeItem === "login"}
            onClick={(e) => handleItemClick(e, "login")}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="Register"
            active={activeItem === "register"}
            onClick={(e) => handleItemClick(e, "register")}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </Container>
  );

  return menuBar;
};

export default Navbar;
