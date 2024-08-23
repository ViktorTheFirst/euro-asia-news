import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownward } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
} from '@/store/Admin';
import { PragraphRole } from '@/utils/interfaces';

// consists of h1 + 3 paragraphs
const SectionComponent = () => {
  const dispatch = useDispatch();
  const articleData = useSelector(getAddArticleData);

  return (
    <div>
      {/* ------------------------------h1------------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>h1 heading</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant='outlined'
            type='text'
            value={articleData.h1}
            onChange={(event) =>
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  h1: event.target.value,
                })
              )
            }
          />
        </AccordionDetails>
      </Accordion>
      {/* ------------------------------h1 PARAGRAPHS------------------------------- */}
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>h1 paragraphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* ------------------------p1------------------------- */}
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownward />}>
              <Typography>p1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*  TODO: debounce */}
              <Select
                label='role'
                value={articleData.h1Paragraphs[0].role}
                onChange={(event) =>
                  dispatch(
                    setAddArticleH1ParagraphRoleAction({
                      pIndex: 0,
                      pRole: event.target.value as PragraphRole,
                    })
                  )
                }
              >
                <MenuItem value={PragraphRole.lead}>Lead</MenuItem>
                <MenuItem value={PragraphRole.quote}>Quote</MenuItem>
                <MenuItem value={PragraphRole.regular}>Regular</MenuItem>
              </Select>
              <TextField
                label='Paragraph 1'
                multiline
                variant='outlined'
                type='text'
                value={articleData.h1Paragraphs[0].text}
                onChange={(event) =>
                  dispatch(
                    setAddArticleH1ParagraphAction({
                      pIndex: 0,
                      pText: event.target.value,
                    })
                  )
                }
                sx={{ width: '100%' }}
              />
            </AccordionDetails>
          </Accordion>
          {/* ------------------------p2------------------------- */}
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownward />}>
              <Typography>p2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*  TODO: debounce */}
              <Select
                label='role'
                value={articleData.h1Paragraphs[1].role}
                onChange={(event) =>
                  dispatch(
                    setAddArticleH1ParagraphRoleAction({
                      pIndex: 1,
                      pRole: event.target.value as PragraphRole,
                    })
                  )
                }
              >
                <MenuItem value={PragraphRole.lead}>Lead</MenuItem>
                <MenuItem value={PragraphRole.quote}>Quote</MenuItem>
                <MenuItem value={PragraphRole.regular}>Regular</MenuItem>
              </Select>
              <TextField
                label='Paragraph 2'
                multiline
                variant='outlined'
                type='text'
                value={articleData.h1Paragraphs[1].text}
                onChange={(event) =>
                  dispatch(
                    setAddArticleH1ParagraphAction({
                      pIndex: 1,
                      pText: event.target.value,
                    })
                  )
                }
                sx={{ width: '100%' }}
              />
            </AccordionDetails>
          </Accordion>
          {/* ------------------------p3------------------------- */}
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownward />}>
              <Typography>p3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*  TODO: debounce */}
              <Select
                label='role'
                value={articleData.h1Paragraphs[2].role}
                onChange={(event) =>
                  dispatch(
                    setAddArticleH1ParagraphRoleAction({
                      pIndex: 2,
                      pRole: event.target.value as PragraphRole,
                    })
                  )
                }
              >
                <MenuItem value={PragraphRole.lead}>Lead</MenuItem>
                <MenuItem value={PragraphRole.quote}>Quote</MenuItem>
                <MenuItem value={PragraphRole.regular}>Regular</MenuItem>
              </Select>
              <TextField
                label='Paragraph 3'
                multiline
                variant='outlined'
                type='text'
                value={articleData.h1Paragraphs[2].text}
                onChange={(event) =>
                  dispatch(
                    setAddArticleH1ParagraphAction({
                      pIndex: 2,
                      pText: event.target.value,
                    })
                  )
                }
                sx={{ width: '100%' }}
              />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SectionComponent;
