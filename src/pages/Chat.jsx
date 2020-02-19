import React, { useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useChatStyles } from './styles';
import {
  UserCards,
  SearchBar,
  MessageList,
  Editor,
  UserPanel,
} from '../containers';
import { initSocket } from '../core/actions/socket';
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const Chat = ({ init }) => {
  const classes = useChatStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = React.useState(true);

  const handleDrawerTrigger = () => {
    setOpen(!open);
  };

  useEffect(() => {
    init();
  }, [init]);

  const closeDrawer = () => {
    if(isMobile){
      setTimeout(() => {
        setOpen(false);
      }, 150);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerTrigger}
            className={classes.menuButton}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Mint
          </Typography>
          <UserPanel />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.searchBar}>
          <SearchBar />
        </div>
        <Divider />
        <UserCards onUserClick={closeDrawer}/>
      </Drawer>
      <main className={classes.content} onClick={closeDrawer}>
        <div className={classes.appBarSpacer} />
        <MessageList />
        <Editor />
      </main>
    </div>
  );
};

const mapDispatchToProps = {
  init: initSocket,
};

export default connect(null, mapDispatchToProps)(Chat);
