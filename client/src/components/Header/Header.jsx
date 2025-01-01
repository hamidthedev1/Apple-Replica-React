import { useState } from "react";
import logo from "../../assets/images/icons/logo-sm.png";
import search from "../../assets/images/icons/search-icon-sm.png";
import cart from "../../assets/images/icons/cart-sm.png";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
function Header() {
  //  State to control the Navbar collapse
  const [expanded, setExpanded] = useState(false);

  // Function to handle item click and close the menu
  const handleNavItemClick = () => {
    setExpanded(false);
  };
  return (
    <div className="nav-wrapper fixed-top">
      <Container>
        <Nav>
          <Navbar
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            expand="lg"
            variant="dark"
            className="w-100"
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <ul className="navbar-nav nav-justified w-100 nav-fill">
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/"
                    onClick={handleNavItemClick}
                  >
                    <img src={logo} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/mac"
                    onClick={handleNavItemClick}
                  >
                    Mac
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/iphone"
                    onClick={handleNavItemClick}
                  >
                    iphone
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/ipad"
                    onClick={handleNavItemClick}
                  >
                    ipad
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/watch"
                    onClick={handleNavItemClick}
                  >
                    watch
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/tv"
                    onClick={handleNavItemClick}
                  >
                    tv
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/music"
                    onClick={handleNavItemClick}
                  >
                    Music
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/support"
                    onClick={handleNavItemClick}
                  >
                    Support
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/search"
                    onClick={handleNavItemClick}
                  >
                    <img src={search} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link js-scroll-trigger"
                    to="/cart"
                    onClick={handleNavItemClick}
                  >
                    <img src={cart} />
                  </Link>
                </li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </Nav>
      </Container>
    </div>
  );
}
export default Header;
