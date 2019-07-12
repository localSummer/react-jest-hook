import React from 'react';
// import {renderRoutes} from 'react-router-config';

const GrandChild = (props) => {
  console.log('props: ', props);
  return (
    <div>
      <h3>Grand Child</h3>
      <div>{props.someProp}</div>
    </div>
  );
};

export default GrandChild;