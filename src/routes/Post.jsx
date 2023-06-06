import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import "./Post.css";

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log(postId)
        const response = await fetch(`https://torfresma-api-client.herokuapp.com/post/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error('Error fetching post:', response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Carregando...</div>;
  }

  const dataJson = post.data;
  const dataFormat = format(new Date(dataJson), 'dd/MM/yyyy')
 

  return (
    <div className='home'>
      <h2>{post.titulo}</h2>
      <div className="post">
      <p>{post.conteudo}</p>
      </div>
      <div className="footer-post">
      <h4>Data: {dataFormat}</h4>
      <h4>Autor: {post.autor.nome}</h4>
      </div>
    </div>
  );
};

export default Post;
