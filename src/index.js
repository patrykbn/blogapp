import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Container>
    </Provider>
  </React.StrictMode>
);

