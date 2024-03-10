import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { Box, Divider } from '@mui/material';

import AddShopingItem from '@/components/shopingList/AddShopingItem';
import ShopingItemsList from '@/components/shopingList/ShopingItemsList';
import ShopingListBottomButtons from '@/components/shopingList/ShopingListBottomButtons';
import { getShopListDataAPI } from '@/api/shopList/shopListAPI';
import { ShopListData } from '@/utils/interfaces';
import { setInitialShopListAction, setShopListAction } from '@/store/ShopList';

interface ShopingListProps {
  shopListData?: ShopListData;
  sessionHouseholdId: string;
}

const ShopingList = ({
  shopListData,
  sessionHouseholdId,
}: ShopingListProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShopListAction(shopListData?.shopList || []));
    dispatch(setInitialShopListAction(shopListData?.shopList || []));
  }, [shopListData, dispatch]);

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
      }}
    >
      <AddShopingItem />
      <Divider orientation='horizontal' flexItem />
      <ShopingItemsList />
      <ShopingListBottomButtons householdId={sessionHouseholdId} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const result = await getShopListDataAPI(cookies.householdId!);

  return {
    props: {
      sessionHouseholdId: cookies.householdId,
      shopListData: !!result?.data
        ? JSON.parse(JSON.stringify(result?.data?.shopListData))
        : null,
    },
  };
};

export default ShopingList;
