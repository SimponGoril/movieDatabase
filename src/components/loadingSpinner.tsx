import React, { FC } from "react";
import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
    to { -webkit-transform: rotate(360deg); }
`

const LoadingSpinnerStyles = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fe4a49;
    animation: ${Spin} 1s ease-in-out infinite;
    -webkit-animation: ${Spin} 1s ease-in-out infinite;
`

// loading spinner courtesy of Thomas Mandelid: https://codepen.io/mandelid/pen/vwKoe
export const LoadingSpinner: FC = ({}) => {
    return (<LoadingSpinnerStyles />)
}