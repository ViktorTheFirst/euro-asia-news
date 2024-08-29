import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button } from '@mui/material';

import S from '../../styles/adminPanelStyles.module.css';

import { clearAddArticleDataAction } from '@/store/Admin';

interface AdminPanelProps {
  nextArticleId: number;
}

const AdminPanel = () => {
  const dispatch = useDispatch();
  return (
    <div className={S.adminPanelContainer}>
      <Button
        color='secondary'
        variant='contained'
        component={Link}
        href='/admin-panel/addArticle'
        sx={{ height: '30px' }}
        onClick={() => dispatch(clearAddArticleDataAction())}
      >
        Add new article
      </Button>
    </div>
  );
};

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await getNextArticleIdAPI();

  const nextArticleId: number = response?.data;

  return {
    props: {
      nextArticleId,
    },
  };
}; */

export default AdminPanel;
