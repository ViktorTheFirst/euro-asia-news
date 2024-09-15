import React from 'react';
import { Box, Typography } from '@mui/material';

import S from '../../styles/tagStyles.module.css';

interface TagProps {
  value: string;
}

const TagComponent = ({ value }: TagProps) => {
  //console.log('value', value);

  return (
    <div className={S.container}>
      <Typography className={S.name}>{value}</Typography>
    </div>
  );
};

export default TagComponent;
