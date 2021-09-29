import React from 'react';
import styled from 'styled-components';

const SplashContainer = styled.section`
  height: 100%;
  min-height: 765px;
  min-width: 540px;
  overflow: hidden;

  #splash-center {
    position: relative;
    width: 915px;
    top: 40vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    h1 {
      text-align: center;
      color: #fffef2;
      margin: 10px auto;
      text-shadow: 5px 5px 0px #eaeaea;
    }
  }
`;

const Splash = () => (
  <SplashContainer>
    <div id="splash-center">
      <h1>IMGPOOL</h1>
    </div>
  </SplashContainer>
);
export default Splash;
