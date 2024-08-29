import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownward } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { uploadImageAPI } from '@/api/news/newsAPI';
import {
  getAddArticleData,
  getNextArticleIdSelector,
  setAddArticleDataAction,
} from '@/store/Admin';
import imagePlaceholder from '../../public/assets/images/placehold.jpg';
import { capitalizeFirstLetter } from '@/utils/functions';
import S from '../../styles/adminPanelStyles.module.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface ImageSectionProps {
  imageType: 'preview' | 'article';
}

export const ImageSectionComponent = ({ imageType }: ImageSectionProps) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const pickImageRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const articleData = useSelector(getAddArticleData);
  const nextArticleId = useSelector(getNextArticleIdSelector);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    pickImageRef.current && pickImageRef.current.click();
  };

  const pickedImageHandler = (event: any) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  const confirmProfileImageChange = async () => {
    if (!file) return;
    const formData = new FormData();

    try {
      formData.append('image', file);
      await uploadImageAPI(nextArticleId.toString(), formData).then(
        (result) => {
          if (result?.data?.fileName) {
            const formatedImagePath = result?.data?.fileName;

            if (imageType === 'preview') {
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  previewImageURL: formatedImagePath,
                })
              );
            } else {
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  articleImageURL: formatedImagePath,
                })
              );
            }
            setPreview(baseUrl + formatedImagePath);
            setFile(null);
          }
        }
      );
    } catch (err) {
      console.warn('Failed changing profile image ' + err);
    }
  };

  const cancelProfileImageChange = () => {
    setPreview(null);
    setFile(null);
  };
  return (
    <div>
      {/* -----------------------PREVIEW IMAGE---------------------- */}
      <Accordion
        disableGutters
        sx={{
          backgroundColor: imageType === 'preview' ? 'pink' : 'greenyellow',
        }}
      >
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>{`${capitalizeFirstLetter(imageType)} image`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={S.previewImageContainer}>
            <Button
              type='button'
              variant='contained'
              color='primary'
              onClick={pickImageHandler}
              sx={{ marginTop: '10px' }}
            >
              {articleData[`${imageType}ImageURL`]
                ? 're-upload image'
                : 'upload image'}
            </Button>

            <input
              id='user-image'
              ref={pickImageRef}
              style={{ display: 'none' }}
              accept='image/*'
              type='file'
              onChange={pickedImageHandler}
            />

            <Image
              src={preview || imagePlaceholder}
              width={300}
              height={300}
              alt='uploaded image'
              style={{
                borderRadius: '10px',
                margin: '15px 0',
              }}
            />

            <div className='row'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={cancelProfileImageChange}
                disabled={!file}
              >
                Cancel
              </Button>
              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={confirmProfileImageChange}
                sx={{ marginLeft: '10px' }}
                disabled={!file}
              >
                Confirm
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* -----------------------PREVIEW IMAGE ALT---------------------- */}
      <Accordion
        disableGutters
        sx={{
          backgroundColor: imageType === 'preview' ? 'pink' : 'greenyellow',
        }}
      >
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>{`${capitalizeFirstLetter(
            imageType
          )} image alt`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant='outlined'
            sx={{ backgroundColor: 'white', width: '100%' }}
            type='text'
            placeholder='image alt'
            value={articleData[`${imageType}ImageAlt`]}
            onChange={(event) => {
              if (imageType === 'preview') {
                dispatch(
                  setAddArticleDataAction({
                    ...articleData,
                    previewImageAlt: event.target.value,
                  })
                );
              } else {
                dispatch(
                  setAddArticleDataAction({
                    ...articleData,
                    articleImageAlt: event.target.value,
                  })
                );
              }
            }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ImageSectionComponent;
