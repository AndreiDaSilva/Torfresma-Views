import "./NewPost.css"
import "./Login.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://torfresma-api-client.herokuapp.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        
        navigate('/');
      } else {
        setLoginError(true);
      }

    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div className="new-post">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="exemplo@exemplo.com"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-control">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="*********"
            id="senha"
            onChange={(e) => setSenha(e.target.value)}
            />
        </div>
        <div className="btn-config">
          <input type="submit" value="Login" className="btn" />
          <Link to={'/cadastro'} className="new-btn">Cadastrar</Link>
        </div>
            {loginError && <p className="erroLogin">Login não foi executado com sucesso. Verifique suas credenciais.</p>}
      </form>
    </div>

  )
};
export default Login;