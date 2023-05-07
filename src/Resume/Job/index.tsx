import * as React from 'react';
import dayjs from 'dayjs';

import styles from './index.module.scss';

type JobProps = {
  title: string;
  company: string;
  start: string;
  end: string;
  location: string;
  details: string[];
  tags: string[];
  type: string;
  url?: string;
};

const DEFAULT_DATE_FORMAT = 'MMM YYYY';

function Job({
  title,
  type,
  company,
  start,
  end,
  location,
  details,
  tags,
  url,
}: JobProps): React.ReactElement {
  // start, end

  const startDate = dayjs(start);
  const endDate = end === 'current' ? dayjs() : dayjs(end);
  // const timePeriod = endDate.diff(startDate, 'month');

  return (
    <div className={styles.Job}>
      <h3>
        <strong>{title}</strong>
        &nbsp;@&nbsp;
        {url?.length ? (
          <a href={url} rel="noreferrer" target="_blank">
            {company}
          </a>
        ) : (
          company
        )}
        &nbsp;
        <small>({type})</small>
      </h3>
      <h5>
        {startDate.format(DEFAULT_DATE_FORMAT)}
        &nbsp;-&nbsp;
        {end === 'current' ? 'Present' : endDate.format(DEFAULT_DATE_FORMAT)}
        &nbsp;|&nbsp;
        {location}
      </h5>
      <ul className={styles.detail}>
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <ul className={styles.tags}>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

export default Job;
