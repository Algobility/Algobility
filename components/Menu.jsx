import React, { useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const DropdownMenu = ({ opts, whenChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [val, setVal] = useState('iron');

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
      <div
        aria-controls='dropdown-menu'
        aria-haspopup='true'
        onClick={handleClick}
        variant='contained'
        className='bg-neutral-700 px-4 py-2 mt-6 mid-shadow mont flex justify-center rounded-md'
      >
        View another rank
      </div>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
