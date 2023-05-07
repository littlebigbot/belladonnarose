import * as React from 'react';

import styles from  './index.module.scss';
import jobs from './jobs.json';
import Job from './Job';

function Resume(): React.ReactElement {
  return <div className={styles.Resume}>
    <h1>Belladonna Rose</h1>

    <ul className={styles.links}>
      <li>
        <a
          href="https://www.linkedin.com/in/belladonna-rose-2321773b/"
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <a
          href="https://github.com/littlebigbot"
          rel="noreferrer"
          target="_blank"
        >
          Business GitHub
        </a>
      </li>
      <li>
        <a
          href="https://github.com/littlebigbot"
          rel="noreferrer"
          target="_blank"
        >
          Personal GitHub
        </a>
      </li>
      <li>
        <a
          href="https://stackoverflow.com/users/1132889/belladonna"
          rel="noreferrer"
          target="_blank"
        >
          StackOverflow
        </a>
      </li>
    </ul>

    <div className={styles.summary}>
      <h3>Background</h3>
      <p>
        Hi, my name is Belladonna Rose. I am a full stack developer with a passion for building beautiful, functional, and accessible web applications. I have a background in design and a love for learning new things. I am a self-starter and a team player. I am looking for a position where I can grow and learn new skills.
      </p>
      <h3>Education</h3>
      <p>
        Bachelor of Arts, Computer Science & Mathematics
      </p>
      <p>
        <strong>Hunter College, New York, NY</strong> (2006-2010)
      </p>
    </div>

   <div className={styles.jobs}>
     { jobs.map((job, index) => <Job key={index} {...job} />) }
   </div>

  </div>;
}

export default Resume;
