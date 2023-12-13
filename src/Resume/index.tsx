import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';

import styles from './index.module.scss';
import jobs from './jobs.json';
import Job from './Job';

function Resume(): React.ReactElement {
  return (
    <div className={styles.Resume}>
      <h1>Belladonna Rose</h1>

      <ul className={styles.links}>
        <li>
          <a
            href="https://www.linkedin.com/in/belladonna-rose-2321773b/"
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon={faLinkedin} aria-hidden={true} />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/littlebigbot"
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon={faGithub} aria-hidden={true} />
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://stackoverflow.com/users/1132889/belladonna"
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon={faStackOverflow} aria-hidden={true} />
            Stack Overflow
          </a>
        </li>
      </ul>

      <div className={styles.summary}>
        <h3>Background</h3>
        <p>
          Hi! I&apos;m Belladonna Rose, a web developer with a love of the front end.
          I&apos;m a (mostly) self-taught developer, making websites since the days of Geocities
          and Angelfire. These days I have developed a passion for building beautiful,
          functional, and accessible web applications, especially with WebRTC.
          Check out the <a target="_blank" rel="noreferrer" href="https://github.com/bxllxdxnnx/bxllxdxnnx">repo</a> for this site to see a sample of my work.
        </p>
        <h3>Education</h3>
        <p>Bachelor of Arts, Computer Science & Mathematics</p>
        <p>
          <strong>Hunter College, New York, NY</strong> (2006-2010)
        </p>
      </div>

      <div className={styles.jobs}>
        {jobs.map((job, index) => (
          <Job key={index} {...job} />
        ))}
      </div>
    </div>
  );
}

export default Resume;
