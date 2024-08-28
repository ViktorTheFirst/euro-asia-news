import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

import S from '../../styles/adminPanelStyles.module.css';
import AddArticleAccordion from '@/components/accordion/AddArticleAccordion';
import { getAddArticleData } from '@/store/Admin';
import { addArticleAPI } from '@/api/news/newsAPI';

const AddArticle = () => {
  const articleData = useSelector(getAddArticleData);

  const handleAddArticle = async () => {
    try {
      const result = await addArticleAPI(articleData);
    } catch (err) {
      console.warn('Error while saving article ', err);
    }
  };

  return (
    <div className={S.addArticleContainer}>
      <div className={S.inputContainer}>
        <Typography
          variant='h3'
          textAlign='center'
          marginBottom={5}
          marginTop={2}
        >
          Input article
        </Typography>
        <AddArticleAccordion />
        <Button
          type='button'
          variant='contained'
          color='secondary'
          onClick={handleAddArticle}
          sx={{ width: '50%', margin: '10px 0 ' }}
        >
          Add article
        </Button>
      </div>
      <div className={S.previewContainer}>
        <Typography>Article preview</Typography>
      </div>
    </div>
  );
};

export default AddArticle;
