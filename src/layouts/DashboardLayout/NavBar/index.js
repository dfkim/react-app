import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Activity as ActivityIcon,
  Settings as SettingsIcon,

} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'ダッシュボード'
  },
  {
    href: '/app/stocks',
    icon: ActivityIcon,
    title: '証券情報'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: '設定'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 0
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
       <i
          className={classes.avatar}
          component={RouterLink}
          to="/app/account"
        />
      <Divider />
      <Box p={2} >
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>

     
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
        alignItems="center"
      >

<a target="_blank"  rel="noopener noreferrer" href="https://www.amazon.co.jp/gp/product/B0895WXXKL/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B0895WXXKL&linkCode=as2&tag=startnipponli-22&linkId=1fcf0f632632f4134611ade7ed0ded3c"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=JP&ASIN=B0895WXXKL&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL160_&tag=startnipponli-22" alt="" /></a><img src="//ir-jp.amazon-adsystem.com/e/ir?t=startnipponli-22&l=am2&o=9&a=B0895WXXKL" width="1" height="1" border="0" alt=""  />

         <a href="https://github.com/dfkim">@dfkim</a>
       
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
