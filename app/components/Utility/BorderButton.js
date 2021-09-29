import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBorderButton = styled.button.attrs((props) => ({
    backgroundColor: props.color || '#333',
    color: props.color || '#333',
    background: props.color || '#333'
}))`
border: 2px solid ${(props => props.color)};
padding: 0px 14px;
width: 326px;
max-width: 100%;
height: 50px;
background: none;
color: ${(props => props.color)};
font-family: sans-serif;
font-size: 1.2rem;
font-weight: 600;
display: block;
cursor: pointer;
transition: background 0.5s ease, color 0.5s ease;

&:hover {
    background: ${(props => props.color)};
    color: #fffef2;
}
&:focus {
    outline: 0;
}
`;

export default StyledBorderButton;
