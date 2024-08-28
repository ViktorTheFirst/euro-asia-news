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
  setAddArticleDataAction,
  setAddArticleH1ParagraphAction,
  setAddArticleH1ParagraphRoleAction,
  setAddArticleH2ParagraphAction,
  setAddArticleH2ParagraphRoleAction,
  setAddArticleH3ParagraphAction,
  setAddArticleH3ParagraphRoleAction,
  setAuthorMediaTypeAction,
  setAuthorMediaURLAction,
} from '@/store/Admin';
import { ArticleType, AuthorMediaType } from '@/utils/interfaces';
import SectionComponent from '../admin/Section';

import ImageSectionComponent from '../admin/ImageSection';

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
      {/* -----------------------PREVIEW IMAGE SECTION---------------------- */}
      <ImageSectionComponent key={1} imageType='preview' />
      {/* -----------------------ARTICLE IMAGE SECTION---------------------- */}
      <ImageSectionComponent key={2} imageType='article' />
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
      {/* ---------------------------AUTHOR-MEDIA--------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Author media</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Select
            value={articleData.authorMedia[0].type}
            onChange={(event) =>
              dispatch(
                setAuthorMediaTypeAction({
                  mIndex: 0,
                  mType: event.target.value as AuthorMediaType,
                })
              )
            }
          >
            <MenuItem value={AuthorMediaType.X}>X</MenuItem>
            <MenuItem value={AuthorMediaType.facebook}>Facebook</MenuItem>
            <MenuItem value={AuthorMediaType.instegram}>Instegram</MenuItem>
            <MenuItem value={AuthorMediaType.substack}>Substack</MenuItem>
            <MenuItem value={AuthorMediaType.linkedIn}>LinkedIn</MenuItem>
          </Select>
          <TextField
            variant='outlined'
            type='text'
            value={articleData.authorMedia[0].url}
            onChange={(event) =>
              dispatch(
                setAuthorMediaURLAction({
                  mIndex: 0,
                  mURL: event.target.value,
                })
              )
            }
          />
          <Select
            value={articleData.authorMedia[1].type}
            onChange={(event) =>
              dispatch(
                setAuthorMediaTypeAction({
                  mIndex: 1,
                  mType: event.target.value as AuthorMediaType,
                })
              )
            }
          >
            <MenuItem value={AuthorMediaType.X}>X</MenuItem>
            <MenuItem value={AuthorMediaType.facebook}>Facebook</MenuItem>
            <MenuItem value={AuthorMediaType.instegram}>Instegram</MenuItem>
            <MenuItem value={AuthorMediaType.substack}>Substack</MenuItem>
            <MenuItem value={AuthorMediaType.linkedIn}>LinkedIn</MenuItem>
          </Select>
          <TextField
            variant='outlined'
            type='text'
            value={articleData.authorMedia[1].url}
            onChange={(event) =>
              dispatch(
                setAuthorMediaURLAction({
                  mIndex: 1,
                  mURL: event.target.value,
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
