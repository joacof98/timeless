import React, { useState, MouseEvent, useContext } from "react";
import { Menu, Container, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {AuthContext} from '../util/auth';
import logoMini from '../Assets/logo50x50.png';

const Navbar: React.FC = () => {
  const {user, logout} = useContext(AuthContext)
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState<String>(path);

  const handleItemClick = (e: MouseEvent, link: String) => {
    setActiveItem(link)
  }

  const menuBar = !user ? (
    <Container>
      <Menu pointing secondary size="massive">
        <Image
          src={logoMini}
          onClick={() => setActiveItem("home")}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right" id="timeless-font">
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
  ) : (
    <Container>
      <Menu pointing secondary size="massive">
        <Image
          src={logoMini}
          onClick={() => setActiveItem("home")}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right" id="timeless-font">
          <Menu.Item
            name="Posts"
            active={activeItem === "posts"}
            onClick={(e) => handleItemClick(e, "posts")}
            as={Link}
            to="/posts"
          />

          <Dropdown
            icon="user"
            item
            text={`${user.username}`}
            onClick={() => setActiveItem("prof")}
          >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/u/${user.username}`}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/habits`}>
                Habits
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/settings`}>
                Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </Container>
  );

  return menuBar;
};

export default Navbar;
