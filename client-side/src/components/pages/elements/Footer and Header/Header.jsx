import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

import { setLogout } from "../../../../state";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user); //

  const oldCOntent = (
    <nav className="Navbar">
      <div className="NavbarItem-left" id="NavbarHome">
        {" "}
        <Link to="/">Home</Link>
      </div>
      <div className="NavbarItem-right" id="NavbarUser">
        <button className="NavbarButton">PLACEHOLDER</button>
        <div class="dropdown-content">
          <Link to="/Profile">Profile</Link>
          <Link to="/Library">Library</Link>

          <Link to="/"> Log out</Link>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </div>
      </div>
      <div className="NavbarItem-right" id="NavbarFav">
        <button className="NavbarButton">Favorite</button>
        <div class="dropdown-content">
          <Link to="/MongoDB">MongoDB list</Link>
        </div>
      </div>
      <div className="NavbarItem-right" id="NavbarNew">
        <button className="NavbarButton">New</button>
        <div class="dropdown-content">
          <Link to="/NewRequest">Request</Link>
          <Link to="/NewTemplate">Template</Link>
          <Link to="/NewGame">Game</Link>
          <Link to="/NewVendor">Vendor</Link>
          <Link to="/register">Account</Link>
        </div>
      </div>
    </nav>
  );

  const UserContent = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    function logOut(e) {
      e.preventDefault();
      dispatch(setLogout());
    }

    return (
      <AppBar position="static" style={{ background: "#7C96AB" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "arial",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Email request generator
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem>
                  {" "}
                  <Link to="/NewRequest">Request</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/NewTemplate">Template</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/NewGame">Game</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/NewVendor">Vendor</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link onClick={handleCloseNavMenu} to="/register">
                    Account
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "arial",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Email request generator
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Tooltip>
                <IconButton onClick={handleOpenNavMenu}>New</IconButton>
              </Tooltip>
              <Menu>
                <MenuItem>
                  {" "}
                  <Link to="/NewRequest">Request</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/NewTemplate">Template</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/NewGame">Game</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link onClick={handleCloseNavMenu} to="/NewVendor">
                    Vendor
                  </Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link onClick={handleCloseNavMenu} to="/register">
                    Account
                  </Link>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.fullName} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  {" "}
                  <Link to="/Profile">Profile</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/Library">Library</Link>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    logOut(e);
                    navigate('/login')
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  const PublicContent = () => {
    return (
      <AppBar position="static" style={{ background: "#7C96AB" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "arial",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Translation requests generator
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "arial",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Email request generator
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  if (user !== null) {
    return UserContent();
  } else {
    return PublicContent();
  }
}

function Header(props) {
  let userLogged = props.isUserLoged;

  return (
    <div>
      <header className="App-header">{Navbar(userLogged)} </header>
    </div>
  );
}

export default Header;
