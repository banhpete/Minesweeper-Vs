import React from 'react';
import LoadingContainerStlyes from './LoadingContainerStyles.module.css'

const LoadingContainer = () => {
  return (
    <div className={LoadingContainerStlyes.Container}>
      <div class={LoadingContainerStlyes.Load}>
        <p>Loading...</p>
        <div class="square-holder">
          <div class={LoadingContainerStlyes.Square}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingContainer;