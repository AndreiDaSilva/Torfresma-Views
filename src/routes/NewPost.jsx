import "./NewPost.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const Newpost = () => {
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('');
  const [descricao, setConteudo] = useState('');
  const [postError, setPostError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('https://torfresma-api-client.herokuapp.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao, token})
      });
      if (response.ok) {
        navigate("/");
      } else {
        setPostError(true);
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="new-post">
      <h2>Inserir novo Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            placeholder="Digite o título"
            id="titulo"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="descricao">Descricao</label>
          <textarea
            type="text"
            name="descricao"
            placeholder="Digite o conteúdo"
            id="conteudo"
            onChange={(e) => setConteudo(e.target.value)}
          />
        </div>
        <input type="submit" value="Novo Post" className="btn" />
        {postError && <p className="erroLogin">Erro ao fazer a publicação</p>}
      </form>
    </div>

  )
};

export default Newpost;