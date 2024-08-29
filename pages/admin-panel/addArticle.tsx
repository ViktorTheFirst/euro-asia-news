import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Alert, Button, Snackbar, Typography } from '@mui/material';

import S from '../../styles/adminPanelStyles.module.css';
import AddArticleAccordion from '@/components/accordion/AddArticleAccordion';
import { clearAddArticleDataAction, getAddArticleData } from '@/store/Admin';
import { addArticleAPI } from '@/api/news/newsAPI';

const AddArticle = () => {
  const [addButtonNotification, setAddButtonNotification] = useState('');
  const articleData = useSelector(getAddArticleData);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddArticle = async () => {
    try {
      const result = await addArticleAPI(articleData);

      if (result) {
        dispatch(clearAddArticleDataAction());
        router.push('/');
        // TODO: convert local notification to redux, app wide global notification
        //setAddButtonNotification(`Article with id ${result.data.id} was added`);
      }
    } catch (err) {
      setAddButtonNotification('Error while adding article');
      console.warn('Error while saving article ', err);
    }
  };

  const handleNotificationClose = () => {
    setAddButtonNotification('');
  };

  const isAddArticleDisabled = useMemo(() => {
    return (
      !articleData.articleImageURL ||
      !articleData.previewImageURL ||
      !articleData.h1 ||
      !articleData.date
    );
  }, [
    articleData.articleImageURL,
    articleData.previewImageURL,
    articleData.h1,
    articleData.date,
  ]);

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
          disabled={isAddArticleDisabled}
          onClick={handleAddArticle}
          sx={{ width: '50%', margin: '15px auto' }}
        >
          Add article
        </Button>
      </div>
      <div className={S.previewContainer}>
        <Typography>Article preview</Typography>
      </div>
      {!!addButtonNotification && (
        <Snackbar
          open={!!addButtonNotification}
          autoHideDuration={4000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleNotificationClose}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            <Typography>{addButtonNotification}</Typography>
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default AddArticle;
