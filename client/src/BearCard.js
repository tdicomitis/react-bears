import React from 'react';
import BearsList from './BearsList'

var BearCard = function (props) {
  return (
    <div className="bear-panel">
      <h4>{ props.name }</h4>
      <p> { props.species } </p>
      <p> { props.color } </p>
      <button onClick={ () => props.deleteBear(props.id)}>Delete The Bear</button>
      <button onClick={ () => props.updateActiveComponent('edit', props.id)}>Edit The Bear</button>
    </div>
  )
};

export default BearCard;
