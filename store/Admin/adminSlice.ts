import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  setAddArticleDataAction,
  setAddArticleH1ParagraphAction,
  setAddArticleH1ParagraphRoleAction,
  setAddArticleH2ParagraphAction,
  setAddArticleH2ParagraphRoleAction,
  setAddArticleH3ParagraphAction,
  setAddArticleH3ParagraphRoleAction,
} from './adminActions';

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAddArticleDataAction, (state, action) => {
      state.addArticleData = action.payload;
    }),
      builder.addCase(setAddArticleH1ParagraphRoleAction, (state, action) => {
        console.log('action.payload', action.payload);
        state.addArticleData.h1Paragraphs[action.payload.pIndex].role =
          action.payload.pRole;

        /* let newState = state.addArticleData;
        newState.h1Paragraphs[action.payload.pIndex].role =
          action.payload.pRole;

        return { ...state, addArticleData: newState }; */
      }),
      builder.addCase(setAddArticleH1ParagraphAction, (state, action) => {
        console.log('action.payload', action.payload);
        state.addArticleData.h1Paragraphs[action.payload.pIndex].text =
          action.payload.pText;
      }),
      builder.addCase(setAddArticleH2ParagraphRoleAction, (state, action) => {
        state.addArticleData.h2Paragraphs[action.payload.pIndex].role =
          action.payload.pRole;
      }),
      builder.addCase(setAddArticleH2ParagraphAction, (state, action) => {
        state.addArticleData.h2Paragraphs[action.payload.pIndex].text =
          action.payload.pText;
      }),
      builder.addCase(setAddArticleH3ParagraphRoleAction, (state, action) => {
        state.addArticleData.h3Paragraphs[action.payload.pIndex].role =
          action.payload.pRole;
      }),
      builder.addCase(setAddArticleH3ParagraphAction, (state, action) => {
        state.addArticleData.h3Paragraphs[action.payload.pIndex].text =
          action.payload.pText;
      });
  },
});

export const adminReducer = adminSlice.reducer;
