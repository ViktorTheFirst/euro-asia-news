import MenuComponent from '@/components/menu/Menu';
import { Container, Row } from '@/styles/globalStyles';
import styled from 'styled-components';

// our-domain.com/
const HomeContainer = styled(Container)`
  background-color: pink;
  height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
`;

const TitleContainer = styled(Container)`
  //background-color: coral;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bolder;
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
    <HomeContainer>
      <TitleContainer>Title</TitleContainer>
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
