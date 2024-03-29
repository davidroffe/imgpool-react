import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  
  .preloader2 {
    position: fixed;
    top: 50vh;
    width: 108px;
    height: 12px;
    display: inline-block;
    padding: 0px;
    text-align: left;
  }
  .preloader2 span {
    position: absolute;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: #000000;
    opacity: 0.2;
    -webkit-animation: preloader21 1s linear infinite alternate;
    animation: preloader21 1s linear infinite alternate;
  }
  .preloader2 span:nth-child(2) {
    animation-name: preloader22;
    -webkit-animation-name: preloader22;
  }
  .preloader2 span:nth-child(3) {
    animation-name: preloader23;
    -webkit-animation-name: preloader23;
  }
  .preloader2 span:nth-child(4) {
    animation-name: preloader24;
    -webkit-animation-name: preloader24;
  }
  .preloader2 span:nth-child(5) {
    animation-name: preloader25;
    -webkit-animation-name: preloader25;
  }
  @keyframes preloader21 {
    0% {
      margin-left: 0px;
    }
    50% {
      margin-left: 96px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @-webkit-keyframes preloader21 {
    0% {
      margin-left: 0px;
    }
    50% {
      margin-left: 96px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @keyframes preloader22 {
    0% {
      margin-left: 0px;
    }
    37.5% {
      margin-left: 72px;
    }
    87.5% {
      margin-left: 72px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @-webkit-keyframes preloader22 {
    0% {
      margin-left: 0px;
    }
    37.5% {
      margin-left: 72px;
    }
    87.5% {
      margin-left: 72px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @keyframes preloader23 {
    0% {
      margin-left: 0px;
    }
    25% {
      margin-left: 48px;
    }
    75% {
      margin-left: 48px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @-webkit-keyframes preloader23 {
    0% {
      margin-left: 0px;
    }
    25% {
      margin-left: 48px;
    }
    75% {
      margin-left: 48px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @keyframes preloader24 {
    0% {
      margin-left: 0px;
    }
    12.5% {
      margin-left: 24px;
    }
    62.5% {
      margin-left: 24px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @-webkit-keyframes preloader24 {
    0% {
      margin-left: 0px;
    }
    12.5% {
      margin-left: 24px;
    }
    62.5% {
      margin-left: 24px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @keyframes preloader25 {
    0% {
      margin-left: 0px;
    }
    50% {
      margin-left: 0px;
    }
    100% {
      margin-left: 96px;
    }
  }
  @-webkit-keyframes preloader25 {
    0% {
      margin-left: 0px;
    }
    50% {
      margin-left: 0px;
    }
    100% {
      margin-left: 96px;
    }
  }
`;

const Loader = (props) => {
  return props.show ? (
    <LoaderContainer>
      <div className="preloader2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </LoaderContainer>
  ) : null;
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Loader;
