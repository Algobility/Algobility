import React, { useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const DropdownMenu = ({ defaultValue, opts, whenChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [val, setVal] = useState(defaultValue);

  console.log(defaultValue);
  useEffect(() => {
    setVal(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    whenChange(val);
  }, [val]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.textContent) setVal(e.target.textContent);
  };

  return (
    <span>
      <Button
        aria-controls='dropdown-menu'
        aria-haspopup='true'
        onClick={handleClick}
        variant='contained'
        className='bg-neutral-600 py-1'
      >
        {val}
      </Button>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {opts.map((rank, i) => (
          <MenuItem key={i} onClick={handleClose}>
            {rank}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
};

export default DropdownMenu;
