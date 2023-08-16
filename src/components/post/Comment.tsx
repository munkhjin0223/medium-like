'use client';

import { FunctionComponent } from 'react';
import Giscus from '@giscus/react';

interface CommentProps {}

const Comment: FunctionComponent<CommentProps> = () => {
  return (
    <Giscus
      id='comments'
      repo='munkhjin0223/medium-like'
      repoId='R_kgDOJ2m1Hg'
      category='Announcements'
      categoryId='DIC_kwDOJ2m1Hs4CYov9'
      mapping='pathname'
      term='Welcome to @giscus/react component!'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme='light'
      lang='en'
      loading='lazy'
    />
  );
};

export default Comment;
