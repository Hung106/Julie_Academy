import React from 'react';
import MuiButton from '@mui/material/Button';
const Button = ({ children, variant = 'contained', color = 'primary', sx = {}, ...props }) => {
  return (
    <MuiButton variant={variant} color={color} sx={sx} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;