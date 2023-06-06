import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { useParams } from 'react-router-dom';

import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom'

//Páginas
import Home from "./routes/Home.jsx"
import NewPost from "./routes/NewPost.jsx"
import Login from './routes/Login.jsx'
import Cadastro from './routes/Cadastro.jsx'
import Usuario from './routes/Usuario.jsx'

import './index.css'
import Post from './routes/Post.jsx'

const Private = ({ Item }) => {
  const token =localStorage.getItem('token');
  return token != null ? <Usuario/> : <Cadastro/>
}

const PostRoute= () => {
  const { postId } = useParams();

  return <Post postId={postId} />;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
        
      },
      {
        path: "/newPost",
        element: <NewPost />
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/cadastro",
        element: <Private Item={Login}/>
      },
      {
        path:"/usuario",
        element: <Usuario />
      },
      {
        path:"post/:postId",
        element: <PostRoute />
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
