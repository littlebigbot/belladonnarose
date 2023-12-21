import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
import jobs from './jobs.json';
import info from './info.json';
import Job from './Job';
import Tag from './Tag';
import { removeByValue } from '../utility/array';

function Resume(): React.ReactElement {

  const [activeTags, setActiveTags] = React.useState([] as string[]);
  const [currentJobs, setCurrentJobs] = React.useState(jobs);
  const [filterOpen, setFilterOpen] = React.useState(false);

  const classes = classNames.bind(styles);

  const filter = (tag: string) => {
    const index = activeTags.indexOf(tag);
    let newActiveTags: string[] = [];
    if(index >= 0) {
      newActiveTags = removeByValue(activeTags, tag);
    } else {
      newActiveTags = activeTags.concat(tag);
    }
    console.log(newActiveTags)
    setActiveTags(newActiveTags);
    if(newActiveTags.length) {
      const newCurrentJobs = jobs
        .filter(job => newActiveTags.every(tag => job.tags.includes(tag)))
      setCurrentJobs(newCurrentJobs);
    } else {
      setCurrentJobs(jobs);
    }
  }

  // converting to Set and back filters out unique vals
  const allTags = Array.from(new Set(jobs
    .map(job => job.tags)
    .flat()));

  return (
    <div className={styles.Resume}>

      <h1 className={styles.name}><span>B</span>elladonna <span>R</span>ose</h1>

      <h3 className={styles.location}>{info.location}</h3>

      <h4 className={styles.email}>{info.email}</h4>

      <ul className={styles.links}>
        <li>
          <a
            href={ `mailto:${info.email}` }
            rel="noreferrer"
            target="_blank"
          >
           <Icon icon={faEnvelope} aria-hidden={true} fixedWidth />
            <span className="sr-only">{info.email}</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/belladonna-rose-2321773b/"
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon={faLinkedin} aria-hidden={true} fixedWidth />
            <span className="sr-only">LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/littlebigbot"
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon={faGithub} aria-hidden={true} fixedWidth />
            <span className="sr-only">GitHub</span>
          </a>
        </li>
        <li>
          <a
            href="https://stackoverflow.com/users/1132889/belladonna"
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon={faStackOverflow} aria-hidden={true} fixedWidth />
            <span className="sr-only">Stack Overflow</span>
          </a>
        </li>
      </ul>


      <div className={styles.background}>
        <h3>Background</h3>
        <p className={styles.summary} dangerouslySetInnerHTML={{__html: info.bio}} />
        <h3>Education</h3>
        <p>Bachelor of Arts, Computer Science & Mathematics</p>
        <p>
          <strong>Hunter College, New York, NY</strong> (2006-2010)
        </p>
      </div>

      <h2>Work History</h2>

      <button
        className={classes('filter', { open: filterOpen })}
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <Icon icon={faFilter} aria-hidden={true} />
        filter
      </button>

      <div
        className={classes('filterSection', { open: filterOpen })}
      >

        <button
          onClick={() => setFilterOpen(false)}
          className={styles.closeFilter}
        >
          <Icon icon={faTimes} aria-hidden={true}/>
          Close
        </button>
        {
          allTags
            .map(
              ( tag, index  ) =>
                <Tag key={index} name={tag} filterByTag={filter} activeTags={activeTags} />
            )
        }
      </div>

      <div className={styles.jobs}>
        {currentJobs.map((job, index) => (
          <Job key={index} filterByTag={filter} activeTags={activeTags} {...job} />
        ))}
      </div>
      <div className={styles.finisher} />
    </div>
  );
}

export default Resume;
