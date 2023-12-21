import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

type TagProps = {
  name: string,
  filterByTag: (tag: string) => void,
  activeTags: string[],
};

function Tag({
               name,
               filterByTag,
               activeTags,
             }: TagProps): React.ReactElement {

  const classes = classNames.bind(styles);

  return  <button
    className={classes('Tag', { active: activeTags.includes(name) })}
    onClick={() => filterByTag(name)}
  >
    {name}
  </button>
}

export default Tag;
