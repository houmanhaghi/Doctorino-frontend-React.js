import React, { useState, useEffect, useContext } from 'react';
import { Box } from "@mui/material";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/LocalHospitalTwoTone";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import theme from "../../assets/theme/defaultTheme";


const NavBar = ({ buttons, bgColor, ...props }) => {
  if (!bgColor) {
    bgColor = theme.palette.navbar
  }
  let { user, authTokens, logOut } = useContext(AuthContext);

  const defultButtons = [
    {
      text: "لیست پزشکان",
      path: "/list-of-doctors",
    },
    {
      text: "جستجوی هتل",
      path: "/hotel-search",
    }
  ];

  const history = useHistory();
  const [pages, setPages] = useState(defultButtons);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    if (buttons?.length > 0 && buttons !== pages) {
      setPages(buttons);
    } else {
      setPages(defultButtons);
    }
  }, [buttons])

  const handleOpenNavMenu = (event) => {

    setAnchorElNav(event.currentTarget);

  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);

  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {

    setAnchorElUser(null);
  };


  return (
    <AppBar
      position="fixed"
      sx={{
        direction: "rtl",
        background: bgColor.main,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: "3px",
          paddingBottom: "7px",
          height: "auto",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              color: "text.primary",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <AdbIcon
              // color="primary"
              color={bgColor.icon}
              onClick={() => history.push("/")}
              sx={{
                color: bgColor.icon,
                display: { xs: "none", md: "flex" }, fontSize: 45, mr: 1
              }}
            />
            {/* {console.log(bgColor)} */}
            دکترینو
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              alignItems: "self-end",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mr: 10,
              }}
            >
              {pages.map(({ text, path }, index) => (
                <MenuItem key={index} value={path} onClick={() => {
                  history.push(path)
                  setAnchorElNav(null)
                }}>
                  <Typography textAlign="center">{text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              mr: 0,
              marginLeft: "10px",
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              flexGrow: 10,
            }}
          >
            <Link to="/">
              {/* <AdbIcon color="primary" sx={{ fontSize: 45, mr: 1 }} /> */}
              <Typography
                variant="h4"
                sx={{
                  display: "inline-block",
                  fontSize: "35px",
                  fontWeight: "bold",
                  color: "text.primary",
                  textDecoration: "none",
                  lineHeight: "45px",
                  letterSpacing: "0em",
                }}
              >
                دکترینو
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, mr: 5, display: { xs: "none", md: "flex" } }}>
            <ButtonGroup
              sx={{ mr: 5, with: "20px", padding: "7px 7px 0px 0px" }}
              variant="inline"
            >
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {pages.map(({ text, path }, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    history.push(path)
                    setAnchorElNav(null)
                  }}
                  sx={{
                    width: "140px",
                    color: "black",
                    padding: "7px -5px 2px",
                    display: "block",
                  }}
                >
                  {text}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              size: "medium",
              "& < *": {
                m: 0,
              },
            }}
          >

            <ButtonGroup
              variant="text"
              size="medium"
              aria-label="text button group"
              sx={{
                width: 'auto',
                margin: '0px 20px 0px 0px',
                padding: "4px  3px 2px 0px",
                display: user ? 'none' : 'flex',
              }}
            >
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
                sx={{ width: 'auto', color: 'black' }}
              >
                &nbsp;ثبت نام
              </Button>

              <Button
                onClick={() => {
                  history.push("/login", { destination: window.location.pathname });
                }}
                sx={{ width: 'auto', color: "Black" }}
              >
                &nbsp;ورود
              </Button>
            </ButtonGroup>

            <ButtonGroup
              variant="text"
              size="medium"
              aria-label="text button group"
              sx={{
                width: 'auto',
                margin: '0px 20px 0px 0px',
                padding: "4px  3px 2px 0px",
                display: !user ? 'none' : 'flex',
              }}
            >
              <Button
                onClick={() => {
                  if (user.role === "doctor") {
                    history.push("/doctor-panel/doctor-profile-completion");
                  } else if (user.role === "hotel_owner") {
                    history.push("/hotel-panel/profile-completion");
                  } else {
                    history.push("/patient-panel/profile");
                  }
                }}
                sx={{ width: 'auto', color: "Black" }}
              >
                پنل کاربری
              </Button>
              <Button
                onClick={() => {
                  logOut();
                }}
                sx={{ width: 'auto', color: "Black" }}
              >
                خروج
              </Button>
            </ButtonGroup>

          </Box>



        </Toolbar>
      </Container >
    </AppBar >
  );
};

export default NavBar;
