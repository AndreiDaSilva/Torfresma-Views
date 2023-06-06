import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

import './Usuario.css';

const Usuario = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const { id_user, nome, email } = decodedToken;
          const userData = { id_user, nome, email };
          setUser(userData);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Token não encontrado no localStorage.');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getPostsUser = async () => {
      try {
        const response = await fetch(
          `https://torfresma-api-client.herokuapp.com/post/user/${user?.id_user}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getPostsUser();
    }
  }, [user]);

  const deletePost = async (postId) => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`https://torfresma-api-client.herokuapp.com/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id_post !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://torfresma-api-client.herokuapp.com/user', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/');
        localStorage.clear();
      } else {
        setDeleteError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sairConta = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="home">
      {user && <h1>{user.nome}</h1>}

      {user && (
        <div>
          <p>Email: {user.email}</p>
        </div>
      )}

      <div className="home">
        <h1>Post do Usuário</h1>
        {Array.isArray(posts) ? (
          posts.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            posts.map((post) => (
              <div className="posts" key={post.id_post}>
                <h2>{post.titulo}</h2>
                <p>{post.conteudo}</p>
                <div className="btns">
                  <Link to={`/post/${post.id_post}`} className="btn">
                    Ver Mais
                  </Link>
                  <button className="btn-delete" onClick={() => deletePost(post.id_post)}>
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </div>
      <div className="btns">
        <button className="btn-delete-user" onClick={deleteUser}>
          Deletar Conta
        </button>
        <button className="btn" onClick={sairConta}>
          Sair da Conta
        </button>
      </div>
      {deleteError && <p className="erroLogin">Todos os post precisam ser deletados primeiros</p>}
    </div>
  );
};

export default Usuario;
