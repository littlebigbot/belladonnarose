import * as React from 'react';
import './index.css';
import { useInterval } from 'utility/hooks';
import { getRandomInt } from 'utility/random';
import {
  ROSE,
  BXLLXDXNNX,
  STEM,
  // USER_INTERACTION_EVENTS,
  NOT_WHITESPACE_REGEX,
  NEWLINE_REGEX,
  NEWLINE,
  INITIAL_UPDATE_INTERVAL,
} from './consts';


function Rose() {

  const [bxllxdxnnxIndex, setBxllxdxnnxIndex] = React.useState(0);
  const [outputRose, setOutputRose] = React.useState(ROSE);
  const [hasUserInput/*, setHasUserInput*/] = React.useState(false);
  const [updateInterval/*, setUpdateInterval*/] = React.useState(INITIAL_UPDATE_INTERVAL);
  const [isMutating, setIsMutating] = React.useState(true);

  // React.useEffect(() => {
  //   const onInput = () => {
  //     setHasUserInput(true);
  //     setOutputRose(ROSE);
  //     setUpdateInterval(50);
  //     setTimeout(() => {
  //       setIsMutating(false);
  //     }, 6 * 1000);
  //
  //     for(const eventName of USER_INTERACTION_EVENTS) {
  //       window.removeEventListener(eventName, onInput);
  //     }
  //   };
  //
  //   for(const eventName of USER_INTERACTION_EVENTS) {
  //     window.addEventListener(eventName, onInput);
  //   }
  //
  //   return () => {
  //     for(const eventName of USER_INTERACTION_EVENTS) {
  //       window.removeEventListener(eventName, onInput);
  //     }
  //   }
  //
  // }, []);

  const processRose = (index: number) => {


    const explodedRose = ROSE.split('');
    // explodedRose[index - 1] = '[';
    // explodedRose[index + 1] = ']';
    explodedRose[index] = BXLLXDXNNX[bxllxdxnnxIndex];

    const rand = getRandomInt(0, 100);

    if(rand < 33) {
      for(let i = index; i < explodedRose.length; i++) {

        if(explodedRose[i].match(NEWLINE_REGEX)) {
          explodedRose[i] = '';
          setUpdateInterval(50);
          break;
        }

        if(i + 1 === explodedRose.length) {
          i = 0;
        }
      }
    }

    setOutputRose(
      explodedRose.join('')
    );
  };

  useInterval(
    () => {

      if(hasUserInput) {
        console.log(outputRose.length);
        if(outputRose.length > 2000) {
          setOutputRose(outputRose + NEWLINE);
        } else {
          setOutputRose(outputRose + STEM);
        }
        return;
      }

      if(updateInterval < INITIAL_UPDATE_INTERVAL) {
        setUpdateInterval(INITIAL_UPDATE_INTERVAL);
      }

     const randomIndex = getRandomInt(0, ROSE.length - 1);

     if(ROSE[randomIndex].match(NOT_WHITESPACE_REGEX)) {

       processRose(randomIndex);

     } else {
       for(let i = randomIndex; i < ROSE.length; i++) {

        if(ROSE[i].match(NOT_WHITESPACE_REGEX)) {
          processRose(i);
          break;
        }

         if(i + 1 === ROSE.length) {
           i = 0;
         }
       }
     }

    setBxllxdxnnxIndex(( bxllxdxnnxIndex + 1 ) % BXLLXDXNNX.length);

    }, isMutating ? updateInterval : null
  );

  return (
    <div className="Rose" dangerouslySetInnerHTML={{ __html: outputRose }}>
    </div>
  );
}

export default Rose;
