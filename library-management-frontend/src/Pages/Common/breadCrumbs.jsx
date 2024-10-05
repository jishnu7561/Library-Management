import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname; // This will be "/profile" or "/books", etc.
  
    // Determine which breadcrumbs to show
    const isHome = currentPath === '/';
    const isBooks = currentPath === '/books';
  return (
    <div role="presentation" onClick={handleClick}>
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="/"
        onClick={() => navigate("/")}
        label="Home"
        icon={<HomeIcon fontSize="small" />}
      />
      
      {/* Show last breadcrumb only if not on home or books page */}
      {!isHome && (
        <StyledBreadcrumb
          label={currentPath.split('/').pop()} // Dynamically set last breadcrumb
          deleteIcon={<ExpandMoreIcon />}
          onDelete={handleClick}
        />
      )}
    </Breadcrumbs>
  </div>

  );
}
