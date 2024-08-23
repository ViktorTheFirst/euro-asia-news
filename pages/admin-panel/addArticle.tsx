import React from 'react';
import S from '../../styles/adminPanelStyles.module.css';
import { Typography } from '@mui/material';
import AddArticleAccordion from '@/components/accordion/AddArticleAccordion';

const AddArticle = () => {
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
      </div>
      <div className={S.previewContainer}>
        <Typography>Article preview</Typography>
      </div>
    </div>
  );
};

export default AddArticle;
