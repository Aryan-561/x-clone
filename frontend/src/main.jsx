import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux"
import store from "../src/app/store.js"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Login, Signup, Home, Explore, Profile, Bookmark, Post, Comment, UserList } from './pages/index.js';
import { EditPage, LandingPage } from './component/index.js';
import ComposePost from './pages/ComposePost/ComposePost.jsx'
import Comingsoon from './pages/Comingsoon/Comingsoon.jsx';
import { injectStore } from './utils/axios.instance';

// Inject store into axios instance
injectStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "explore",
        element: <Explore />
      },
      {
        path: "/:username",
        element: <Profile />
      },
      {
        path: "/:username/follower",
        element: <UserList connectionType = "follower"/>
      },
      {
        path: "/:username/following",
        element: <UserList connectionType = "following"/>
      },
      {
        path: "bookmarks",
        element: <Bookmark />
      },
      {
        path:"messages",
        element:<Comingsoon/>
      },
      {
        path:"communities",
        element:<Comingsoon/>
      },
      {
        path:"grok",
        element:<Comingsoon/>
      },
      {
        path: "/compose/edit",
        element: <EditPage />
      },
      {
        path: "compose/post",
        element: (
          <>
            <Home />
            <ComposePost />
          </>
        )
      },
      {
        path: "/:username/post/:postId",
        element: <Post />
      },
      {
        path: ":username/comment/:commentId",
        element: <Comment />
      },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
);
