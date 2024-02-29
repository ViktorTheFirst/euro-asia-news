import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';

import { Container } from '@/styles/globalStyles';
import { MOCK_SHOPING_LIST } from '@/utils/mocks';
import ShopingItem from '../shopingItem/ShopingItem';

const ListContainer = styled(Container)`
  height: ${(props) => 100 - 10 - 7 /* props.theme.appBarHeight */}vh;
  display: flex;
  flex-direction: column;
  background-color: #99e25d;
  justify-content: flex-start;
  align-items: center;
`;

const StyledList = styled(List)`
  width: 100%;
`;

const ShopingItemsList = () => {
  return (
    <ListContainer>
      <StyledList>
        {MOCK_SHOPING_LIST.map(
          (item: { name: string; amount: number }, index: number) => {
            const labelId = `checkbox-list-label-${item.name}`;

            return (
              <ShopingItem
                key={`${item.name}_${index}`}
                labelId={labelId}
                item={item}
                itemsAmount={MOCK_SHOPING_LIST.length - 1}
                index={index}
              />
            );
          }
        )}
      </StyledList>
    </ListContainer>
  );
};

export default ShopingItemsList;
