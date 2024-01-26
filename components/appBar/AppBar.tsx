import { Container } from '@/styles/globalStyles';
import { AppBar as MuiAppBar, useTheme } from '@material-ui/core';
import { Button, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';

const AppBarContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  felx-grow: 1;
`;

const AppBar = () => {
  const theme = useTheme();

  return (
    <AppBarContainer>
      <MuiAppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </MuiAppBar>
    </AppBarContainer>
  );
};

export default AppBar;
