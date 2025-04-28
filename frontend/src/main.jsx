import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux"
import store from "../src/app/store.js"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Login, Signup, Home, Explore, Profile, Bookmark, Post, CommentReplies } from './pages/index.js';
import { EditPage, LandingPage } from './component/index.js';
import ComposePost from './pages/ComposePost/ComposePost.jsx'
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
        path: "profile",
        element: <Profile />
      },
      {
        path: "bookmarks",
        element: <Bookmark />
      },
      {
        path: "profile/compose/edit",
        element: <EditPage />
      },
      {
        path: "/compose/post",
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
        path: "/:username/comment/:commentId",
        element: <CommentReplies />
      },
    ]
  }

]);



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
);
