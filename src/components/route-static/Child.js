import React from 'react';
import routes from '../../routes/index';
import {renderRoutes, matchRoutes} from 'react-router-config';

const Child = (props) => {
  console.log('props: ', props);
  console.log('matchRoutes', matchRoutes(routes, "/child/23"));
  const handleClick = () => {
    props.history.push(`${props.match.url}/grand-child`);
  };
  return (
    <div>
      <h2>Child</h2>
      <button type="button" onClick={handleClick}>跳转至子路由</button>
      {/* child routes won't render without this */}
      {renderRoutes(props.route.routes, { someProp: "these extra props are optional" })}
    </div>
  );
};

export default Child;