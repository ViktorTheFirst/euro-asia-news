import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';

import S from '../../styles/adminPanelStyles.module.css';

const AdminPanel = () => {
  const router = useRouter();

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

export default AdminPanel;
