import * as React from 'react';

import Rose from './vignettes/Rose';
import './index.scss';

function Home(): React.ReactElement {
  return (
    <div className="Home">
      <Rose />
    </div>
  );
}

export default Home;
