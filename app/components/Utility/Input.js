import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
&[type='text'],
&[type='password'] {
  padding: 15px 10px;
  width: 300px;
  display: block;
  border: none;
  border-bottom: 1px solid #333;
  margin: 10px auto;
  font-size: 1.2rem;
  font-family: sans-serif;
  font-weight: 600;
  background: none;
}

&[type='text']:focus,
&[type='password']:focus,
textarea:focus {
  outline: 0;
}

::-webkit-input-placeholder {
  opacity: 1;
}

::-moz-placeholder {
  /* Firefox 19+ */
  opacity: 1;
}

::-ms-input-placeholder {
  opacity: 1;
}
`;

export default StyledInput;
