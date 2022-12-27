import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RouterProvider from './provider/router_context';
import AuthProvider from './provider/auth_provider';
import NotificationProvider from './provider/notification';
import {Helmet} from "react-helmet";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Helmet>‍
      <meta charSet="utf-8" />
      <title>Sol Guerrilla</title>‍
      <meta name="description" content="Help transition the world to a greener cleaner future with your internet search.  Create an account to support solar power projects, get updates on the most recent environmental trends and submit solar power projects for funding.   
  Multiply the impact of your internet searches by inviting your friends to join your network."/>
    </Helmet>
    <React.StrictMode>
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </NotificationProvider>
      </AuthProvider>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
