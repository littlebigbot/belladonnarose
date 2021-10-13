import * as React from 'react';
import './index.css';

function Rose() {

  const asciiRose = `
        .     .
    ...  :\`\`..':
     : \`\`\`\`.'   :''::'
   ..:..  :     .'' :
\`\`.    \`:    .'     :
    :    :   :        :
     :   :   :         :
     :    :   :        :
      :    :   :..''''\`\`::.
       : ...:..'     .''
       .'   .'  .::::'
      :..'''\`\`:::::::
      '         \`::::
                  \`::.
                   \`::
                    :::.
         ..:\`\`\`.:'\`. ::'\`.
       ..'      \`:.: ::
      .:        .:\`\`:::
      .:    ..''     :::
       : .''         .::
        :          .'\`::
                       ::
                       ::
                        :
                        :
                        :
                        :
                        .
  `

  return (
    <div className="Rose" dangerouslySetInnerHTML={{ __html: asciiRose }}>
    </div>
  );
}

export default Rose;
