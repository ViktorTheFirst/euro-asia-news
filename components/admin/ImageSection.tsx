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
import profilePicPlaceHolder from '../../public/assets/images/profile_placeholder.jpg';

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
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>{`${imageType} image`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={pickImageHandler}
            sx={{ marginTop: '10px' }}
          >
            Upload image
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
            src={preview || profilePicPlaceHolder}
            width={300}
            height={300}
            alt='uploaded image'
            style={{
              borderRadius: '10px',
            }}
          />

          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={confirmProfileImageChange}
          >
            Confirm
          </Button>
          <Button
            type='button'
            variant='contained'
            color='secondary'
            onClick={cancelProfileImageChange}
          >
            Cancel
          </Button>
        </AccordionDetails>
      </Accordion>
      {/* -----------------------PREVIEW IMAGE ALT---------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>{`${imageType} image alt`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant='outlined'
            type='text'
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
