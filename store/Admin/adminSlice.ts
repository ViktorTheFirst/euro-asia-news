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
  setNextArticleIdAction,
  setAuthorMediaTypeAction,
  setAuthorMediaURLAction,
} from './adminActions';

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAddArticleDataAction, (state, action) => {
      state.addArticleData = action.payload;
    }),
      builder.addCase(setNextArticleIdAction, (state, action) => {
        state.nextArticleId = action.payload;
      }),
      /* ----------------------------AUTHOR MEDIA------------------------- */
      builder.addCase(setAuthorMediaTypeAction, (state, action) => {
        state.addArticleData.authorMedia[action.payload.mIndex].type =
          action.payload.mType;
      }),
      builder.addCase(setAuthorMediaURLAction, (state, action) => {
        state.addArticleData.authorMedia[action.payload.mIndex].url =
          action.payload.mURL;
      }),
      /* ---------------------------------H1--------------------------------- */
      builder.addCase(setAddArticleH1ParagraphRoleAction, (state, action) => {
        state.addArticleData.h1Paragraphs[action.payload.pIndex].role =
          action.payload.pRole;
      }),
      builder.addCase(setAddArticleH1ParagraphAction, (state, action) => {
        state.addArticleData.h1Paragraphs[action.payload.pIndex].text =
          action.payload.pText;
      }),
      /* ---------------------------------H2--------------------------------- */
      builder.addCase(setAddArticleH2ParagraphRoleAction, (state, action) => {
        state.addArticleData.h2Paragraphs[action.payload.pIndex].role =
          action.payload.pRole;
      }),
      builder.addCase(setAddArticleH2ParagraphAction, (state, action) => {
        state.addArticleData.h2Paragraphs[action.payload.pIndex].text =
          action.payload.pText;
      }),
      /* ---------------------------------H3--------------------------------- */
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
