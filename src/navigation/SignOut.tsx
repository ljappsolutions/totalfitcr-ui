import Auth from '@aws-amplify/auth';
import React, { useState, FunctionComponent } from 'react';
import ImageAvatars from './Avatar';
import {
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
} from '@material-ui/core';

const SignOut: FunctionComponent = () => {
  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(openMenu);

  const signOutEvent = async () => {
    setOpenMenu(null);
    try {
      await Auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  const openMenuEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpenMenu(event.currentTarget);
  }

  const closeMenu = () => {
    setOpenMenu(null);
  }

  return (
    <>
      <ImageAvatars
        onClick={openMenuEvent}
        url={''}
        aria-controls="menu-list-grow"
        aria-haspopup="true"
      />
      <Popper
        open={isOpen}
        anchorEl={openMenu}
        transition={true}
        disablePortal={true}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center bottom' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList>
                  <MenuItem onClick={signOutEvent}>Sign Out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default SignOut;
