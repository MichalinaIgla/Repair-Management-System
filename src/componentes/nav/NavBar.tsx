import { AppBar, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css';
import { SidebarData } from './SidebarData';
const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    title: {
        flexGrow: 1,
      }
  });
  

export const NavBar:React.FC = () => {
    const classes = useStyles();
    const [sidebar, setSidebar] = useState(false);
    const username = JSON.parse(localStorage.getItem('user')  || '{}').username;
    // const showSidebar = () => setSidebar(!sidebar);
    const history = useHistory();

    const toggleDrawer = (open:boolean) => ( 
    event: React.KeyboardEvent | React.MouseEvent,) =>{
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setSidebar(open);
    };


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      localStorage.clear();
      history.push("/login");
      history.go(0);
    };


    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='primary-search-account-menu'
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link className="ProfileLink" to='./profile'>
            Profile
          </Link>
          </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
          </MenuItem>
      </Menu>
    );
        
    return(
        <>
        <AppBar position="static" color='transparent'>
            <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Typography   display="inline" noWrap className="companyName">Repair Service</Typography>
            <Grid container justify="flex-end" className={classes.title}>
                <Typography className="headerTextHi" >
                    Hello, {username}
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  >
                  <PersonOutlineOutlinedIcon  />
                </IconButton>
                
            {renderMenu}
            </Grid>
            </Toolbar>
        </AppBar>

        <nav>
        <React.Fragment key="left">
            <Drawer anchor="left" open={sidebar} onClose={toggleDrawer(false)}>
                <div className={clsx(classes.list, {
                    [classes.fullList]: null || null })}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                    <List>
                        {SidebarData.map((item, index) => {
                            return(
                              <Link to={item.path} key={index} className="SideBarLink">
                                <ListItem  key={index}>  
                                {/* import { Link } from 'react-router'; */}
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                </ListItem>
                              </Link>
                            )
                        })}
                    </List>
                </div>
            </Drawer>
        </React.Fragment>


        </nav>

        </>
    )
}