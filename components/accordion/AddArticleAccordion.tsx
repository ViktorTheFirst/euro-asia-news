import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownward } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  getAddArticleData,
  getNextArticleIdSelector,
  setAddArticleDataAction,
  setAddArticleH1ParagraphAction,
  setAddArticleH1ParagraphRoleAction,
  setAddArticleH2ParagraphAction,
  setAddArticleH2ParagraphRoleAction,
  setAddArticleH3ParagraphAction,
  setAddArticleH3ParagraphRoleAction,
} from '@/store/Admin';
import { ArticleType } from '@/utils/interfaces';
import SectionComponent from '../admin/Section';
import { uploadImageAPI } from '@/api/news/newsAPI';
import profilePicPlaceHolder from '../../public/assets/images/profile_placeholder.jpg';

// TODO: relocate to BE
const existingTags = [
  'war',
  'politics',
  'health',
  'fasion',
  'art',
  'computers',
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface AccordionProps {}

const AddArticleAccordion = ({}: AccordionProps) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const pickImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const dispatch = useDispatch();
  const articleData = useSelector(getAddArticleData);
  const nextArticleId = useSelector(getNextArticleIdSelector);

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
      formData.append('imageType', 'previewImage');
      formData.append('image', file);

      await uploadImageAPI(nextArticleId.toString(), formData).then(
        (result) => {
          console.log('result.data', result?.data);
          if (result?.data?.fileName) {
            dispatch(
              setAddArticleDataAction({
                ...articleData,
                previewImageURL: result?.data?.fileName,
              })
            );
            setPreview(baseUrl + '/' + result?.data?.fileName);
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
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      sx={{ width: '100%' }}
    >
      {/* ------------------------------TYPE------------------------------ */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Article type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Select
            value={articleData.articleType}
            onChange={(event) =>
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  articleType: event.target.value as ArticleType,
                })
              )
            }
          >
            <MenuItem value={ArticleType.image}>Image</MenuItem>
            <MenuItem value={ArticleType.audio}>Audio</MenuItem>
            <MenuItem value={ArticleType.main}>Main</MenuItem>
            <MenuItem value={ArticleType.video}>Video</MenuItem>
            <MenuItem value={ArticleType.regular}>Regular</MenuItem>
          </Select>
        </AccordionDetails>
      </Accordion>
      {/* ------------------------------DATE------------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Article date</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant='outlined'
            type='date'
            value={articleData.date}
            onChange={(event) =>
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  date: event.target.value as unknown as Date,
                })
              )
            }
          />
        </AccordionDetails>
      </Accordion>
      {/* -------------------------------PREVIEW IMAGE-------------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Preview image</Typography>
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
            alt='User profile picture'
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
      {/* ------------------------------AUTHOR------------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Article author</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant='outlined'
            type='text'
            value={articleData.author}
            onChange={(event) =>
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  author: event.target.value,
                })
              )
            }
          />
        </AccordionDetails>
      </Accordion>
      {/* ------------------------------TAGS------------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Article tags</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            multiple
            sx={{ width: '200px' }}
            limitTags={4}
            onChange={(event, newValue) => {
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  tags: newValue,
                })
              );
            }}
            options={existingTags}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField {...params} variant='standard' />
            )}
          />
        </AccordionDetails>
      </Accordion>
      {/* ------------------------------SECTION 1------------------------------- */}
      <SectionComponent
        key={1}
        hType='h1'
        addParagraphRoleAction={setAddArticleH1ParagraphRoleAction}
        addParagraphTextAction={setAddArticleH1ParagraphAction}
      />
      {/* ------------------------------SECTION 2------------------------------- */}
      <SectionComponent
        key={2}
        hType='h2'
        addParagraphRoleAction={setAddArticleH2ParagraphRoleAction}
        addParagraphTextAction={setAddArticleH2ParagraphAction}
      />
      {/* ------------------------------SECTION 3------------------------------- */}
      <SectionComponent
        key={3}
        hType='h3'
        addParagraphRoleAction={setAddArticleH3ParagraphRoleAction}
        addParagraphTextAction={setAddArticleH3ParagraphAction}
      />
    </Box>
  );
};

export default AddArticleAccordion;
