import { useState } from 'react';
import { ArrowDownward } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { ArticleType } from '@/utils/interfaces';
import SectionComponent from '../admin/Section';
import { getAddArticleData, setAddArticleDataAction } from '@/store/Admin';
import { useDispatch, useSelector } from 'react-redux';

// TODO: relocate to BE
const existingTags = [
  'war',
  'politics',
  'health',
  'fasion',
  'art',
  'computers',
];

interface AccordionProps {}

const AddArticleAccordion = ({}: AccordionProps) => {
  const dispatch = useDispatch();
  const articleData = useSelector(getAddArticleData);

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
      <SectionComponent />
    </Box>
  );
};

export default AddArticleAccordion;
