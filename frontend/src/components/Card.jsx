import React, { useMemo, useState } from 'react';
import { Paper, Typography, Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.95] } }
};

/**
 * Một Card component có thể tái sử dụng để hiển thị các tính năng hoặc thông tin nổi bật.
 * @param {object} props 
 * @param {React.ElementType} props.icon 
 * @param {string} props.title 
 * @param {string} props.description 
 * @param {string} props.lightBg 
 */
function Card({ icon: Icon, title, description, lightBg }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const paperSx = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
    p: { xs: 3.5, md: 4 },
    borderRadius: '24px',
    border: '1px solid',
    borderColor: theme.palette.divider,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    background: isDark ? alpha(theme.palette.background.paper, 0.6) : lightBg,
    backdropFilter: isDark ? 'blur(12px)' : 'none',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 10px 25px -5px ${alpha(isDark ? theme.palette.primary.dark : theme.palette.primary.light, 0.2)}`
    }
  }), [theme, isDark, lightBg]);

  const iconWrapperSx = useMemo(() => ({
    mb: 2.5,
    background: `linear-gradient(45deg, ${theme.palette.info.light}, ${theme.palette.primary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }), [theme]);

  return (
    <Box component={motion.div} variants={fadeInUp} sx={{ display: 'flex', flex: '1 1 300px', maxWidth: 360 }}>
      <Paper elevation={0} sx={paperSx}>
        <Box sx={iconWrapperSx}>
          <Icon sx={{ fontSize: 52 }} />
        </Box>
        <Typography component="h3" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem', fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1rem', lineHeight: 1.7, color: 'text.secondary' }}>
          {description}
        </Typography>
      </Paper>
    </Box>
  );
}

export default React.memo(Card);