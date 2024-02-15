import styled from 'styled-components';
import fs from 'fs/promises';
import path from 'path';
import { GetStaticProps } from 'next';

import MainMenu from '@/components/menu/MainMenu';
import { Container, Row } from '@/styles/globalStyles';

// our-domain.com/
const HomeContainer = styled(Container)`
  background-color: pink;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
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

interface HomePageProps {
  mainTopics: { title: string }[];
}

const HomePage = ({ mainTopics }: HomePageProps) => {
  return (
    <HomeContainer>
      <Row>
        <HouseContainer>House here</HouseContainer>
        <MenuContainer>
          <MainMenu topics={mainTopics} />
        </MenuContainer>
      </Row>
    </HomeContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'mainMenuTopics.json');
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(jsonData);

  return {
    props: {
      mainTopics: data.topics,
    },
  };
};

export default HomePage;
