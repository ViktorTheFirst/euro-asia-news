import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';

import S from '../../styles/adminPanelStyles.module.css';
import { GetServerSideProps } from 'next';
import { getNextArticleIdAPI } from '@/api/news/newsAPI';
import { setNextArticleIdAction } from '@/store/Admin';

interface AdminPanelProps {
  nextArticleId: number;
}

const AdminPanel = ({ nextArticleId }: AdminPanelProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    nextArticleId && dispatch(setNextArticleIdAction(nextArticleId));
  }, []);

  return (
    <div className={S.adminPanelContainer}>
      <Button
        color='secondary'
        variant='contained'
        component={Link}
        href='/admin-panel/addArticle'
        sx={{ height: '30px' }}
      >
        Add new article
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const newsResponse = await getNextArticleIdAPI();

  const nextArticleId: number = newsResponse?.data;

  return {
    props: {
      nextArticleId,
    },
  };
};

export default AdminPanel;
