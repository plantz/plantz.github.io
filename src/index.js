import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/bulma/css/bulma.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
