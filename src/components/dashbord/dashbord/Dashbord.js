import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Button } from "@mui/material";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Common from "../common/Common";
import Payment from "../payment/Payment";
// import MyOrder from "../myorder/MyOrder";
import AllOrders from "../allorder/AllOrders";
// import ManageService from "../manageservice/ManageService";
import AddAdmin from "../addadmin/AddAdmin";
import AddService from "../addservice/AddService";
import Footer from "../../footer/Footer";
import MyOrders from "../myorder/MyOrdere";
import ManageService from "../manageserevice/ManageService";
import useAuth from "../../../useHooks/useAuth";
import Reviw from "../review/Reviw";

const drawerWidth = 240;

function Dashbord(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { user, admin, logout } = useAuth();
  console.log(admin);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* <List>
        <ListItem button>
          <ListItemText>
            <Link to="/">Home</Link>
          </ListItemText>
        </ListItem>
      </List> */}
      <Box sx={{ mt: 1 }}>
        {admin ? (
          <>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button fullWidth>Home</Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`${url}/allorders`}>
              <Button fullWidth>Manage All Orders</Button>
            </Link>
            <Link
              to={`${url}/manageservice`}
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth>Manage Products</Button>
            </Link>
            <Link to={`${url}/addservice`} style={{ textDecoration: "none" }}>
              <Button fullWidth>Add A Service</Button>
            </Link>
            <Link to={`${url}/addadmin`} style={{ textDecoration: "none" }}>
              <Button fullWidth>Make Admin</Button>
            </Link>
          </>
        ) : (
          <>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button fullWidth>Home</Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`${url}/payment`}>
              <Button fullWidth>Payment</Button>
            </Link>

            <Link style={{ textDecoration: "none" }} to={`${url}/myorders`}>
              <Button fullWidth>My Orders</Button>
            </Link>

            <Link style={{ textDecoration: "none" }} to={`${url}/review`}>
              <Button fullWidth>Review</Button>
            </Link>
          </>
        )}

        <Button onClick={logout} fullWidth>
          Logout
        </Button>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashbord
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          <Switch>
            <Route exact path={path}>
              <Common></Common>
            </Route>
            <Route path={`${path}/payment`}>
              <Payment></Payment>
            </Route>
            <Route path={`${path}/myorders`}>
              <MyOrders></MyOrders>
            </Route>
            <Route path={`${path}/allorders`}>
              <ManageService></ManageService>
            </Route>
            <Route path={`${path}/manageservice`}>
              <AllOrders></AllOrders>
            </Route>
            <Route path={`${path}/addadmin`}>
              <AddAdmin></AddAdmin>
            </Route>
            <Route path={`${path}/addservice`}>
              <AddService></AddService>
            </Route>
            <Route path={`${path}/review`}>
              <Reviw></Reviw>
            </Route>
          </Switch>
        </Typography>
      </Box>
    </Box>
  );
}

Dashbord.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashbord;
