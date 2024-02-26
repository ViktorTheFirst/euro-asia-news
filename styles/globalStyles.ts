import Link from 'next/link';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Row = styled(Container)`
  flex-direction: row;
`;

export const Col = styled(Container)`
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledTypography = styled(Typography)`
  caret-color: transparent;
`;
