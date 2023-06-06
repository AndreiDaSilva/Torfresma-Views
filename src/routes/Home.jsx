import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import tsbFetch from "../axios/config";


const Home = () => {

  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await tsbFetch.get("/post");
      const data = response.data.posts;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getPosts()
  }, [])


  return (
    <div className="home">
      <h1>
        Todos os Posts
      </h1>
      {posts.length === 0 ? <p>Carregando...</p> : (
        posts.map((post) => (
          <div className="posts" key={post.id_post}>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <Link to={`/post/${post.id_post}`} className="btn">Ver Mais</Link>
          </div>
        ))
      )}
    </div>
  )
};

export default Home;