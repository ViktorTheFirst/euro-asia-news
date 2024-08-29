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

import { getAddArticleData, setAddArticleDataAction } from '@/store/Admin';
import { PragraphRole } from '@/utils/interfaces';
import { capitalizeFirstLetter } from '@/utils/functions';
import S from '../../styles/adminPanelStyles.module.css';

interface SectionProps {
  hType: 'h1' | 'h2' | 'h3';
  addParagraphRoleAction: any; // TODO: change the any
  addParagraphTextAction: any;
}

const colorMap = {
  h1: '#008080be',
  h2: '#50c878d1',
  h3: '#0047abc0',
};

// consists of h1 + 3 paragraphs
const SectionComponent = ({
  hType,
  addParagraphRoleAction,
  addParagraphTextAction,
}: SectionProps) => {
  const dispatch = useDispatch();
  const articleData = useSelector(getAddArticleData);

  return (
    <div className={S.accordionHeadingsContainer}>
      {/* ------------------------------heading------------------------------- */}
      <Accordion disableGutters sx={{ backgroundColor: colorMap[hType] }}>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>{`${capitalizeFirstLetter(hType)} heading`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            sx={{ backgroundColor: 'white', width: '100%' }}
            variant='outlined'
            multiline
            placeholder={`article ${hType}`}
            type='text'
            value={articleData[hType]}
            onChange={(event) =>
              dispatch(
                setAddArticleDataAction({
                  ...articleData,
                  [hType]: event.target.value,
                })
              )
            }
          />
        </AccordionDetails>
      </Accordion>
      {/* ------------------------------PARAGRAPHS------------------------------- */}
      <Accordion disableGutters sx={{ backgroundColor: colorMap[hType] }}>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>{`${capitalizeFirstLetter(
            hType
          )} paragraphs`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* ------------------------p1------------------------- */}
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ArrowDownward />}>
              <Typography>p1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*  TODO: debounce */}
              <Select
                value={articleData[`${hType}Paragraphs`][0].role}
                sx={{ marginBottom: '15px' }}
                onChange={(event) =>
                  dispatch(
                    addParagraphRoleAction({
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
                minRows={3}
                variant='outlined'
                type='text'
                value={articleData[`${hType}Paragraphs`][0].text}
                onChange={(event) =>
                  dispatch(
                    addParagraphTextAction({
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
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ArrowDownward />}>
              <Typography>p2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*  TODO: debounce */}
              <Select
                sx={{ marginBottom: '15px' }}
                value={articleData[`${hType}Paragraphs`][1].role}
                onChange={(event) =>
                  dispatch(
                    addParagraphRoleAction({
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
                minRows={3}
                variant='outlined'
                type='text'
                value={articleData[`${hType}Paragraphs`][1].text}
                onChange={(event) =>
                  dispatch(
                    addParagraphTextAction({
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
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ArrowDownward />}>
              <Typography>p3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*  TODO: debounce */}
              <Select
                sx={{ marginBottom: '15px' }}
                value={articleData[`${hType}Paragraphs`][2].role}
                onChange={(event) =>
                  dispatch(
                    addParagraphRoleAction({
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
                minRows={3}
                type='text'
                value={articleData[`${hType}Paragraphs`][2].text}
                onChange={(event) =>
                  dispatch(
                    addParagraphTextAction({
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
