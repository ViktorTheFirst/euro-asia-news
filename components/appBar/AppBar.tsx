import { Container } from '@/styles/globalStyles';
import { AppBar as MuiAppBar } from '@material-ui/core';
import { Button, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';

const AppBarContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.theme.appBarHeight}vh;
`;

const AppBar = () => {
  return (
    <AppBarContainer>
      <MuiAppBar position='static' /* sx={{ minHeight: 50px }} */>
        <Toolbar>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </MuiAppBar>
    </AppBarContainer>
  );
};

export default AppBar;
