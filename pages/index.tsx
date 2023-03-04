import MenuComponent from '@/components/menu/Menu';
import { Container, Row } from '@/styles/globalStyles';
import { navBarHeight } from '@/utils/constants';
import styled from 'styled-components';

// our-domain.com/
const HomeContainer = styled(Container)<{ barheight: number }>`
  background-color: pink;
  height: ${({ barheight }) => 100 - barheight}vh;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
`;

const HouseContainer = styled(Container)`
  //background-color: #d84acc;
  height: 75vh;
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const MenuContainer = styled(Container)`
  //background-color: #4ad8b5;
  height: 75vh;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

const HomePage = () => {
  const mainTopics = ['Bills', 'Invoices', 'Cars', 'Shoping List'];

  return (
    <HomeContainer barheight={navBarHeight}>
      <Row>
        <HouseContainer>House here</HouseContainer>
        <MenuContainer>
          <MenuComponent mode='main-menu' topics={mainTopics} />
        </MenuContainer>
      </Row>
    </HomeContainer>
  );
};

export default HomePage;
