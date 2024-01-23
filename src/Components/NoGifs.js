import React from 'react';
import  sadman from '../Images/sad-man-icon.png'
const NoGifs = props => (
  <li className='no-gifs'>
  <img src={sadman} alt="sad" />
  <h3>Sorry, no GIFs match your search.</h3>
  </li>
);

export default NoGifs;