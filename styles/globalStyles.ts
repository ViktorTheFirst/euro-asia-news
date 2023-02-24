import Link from 'next/link';
import styled from 'styled-components';

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
