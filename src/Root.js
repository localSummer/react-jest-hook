import React from 'react';
import {renderRoutes} from 'react-router-config';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes/index';

const Root = () => {
  return (
    <Router>
      <div>
        <h1>Root</h1>
        {/* child routes won't render without this */}
        {renderRoutes(routes)}
      </div>
    </Router>
  );
};

export default Root;