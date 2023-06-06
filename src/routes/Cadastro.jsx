import "./Cadastro.css"
import "./NewPost.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const Login = () => {
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState(false);
    const [nome, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://torfresma-api-client.herokuapp.com/user/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha })
            });
            if (response.ok) {
                navigate('/login');
            } else {
                setLoginError(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div className="new-post">
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="nome">Nome do Usuário</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do usuário"
                        id="nome"
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
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
                <div className="futterForm">
                <input type="submit" className="btn" value="Cadastrar" />
                    <p>Já possui cadastro? <Link to={'/login'}> Fazer Login</Link> </p>
                </div>
                    {loginError && <p className="erroLogin">Email ja cadastrado.</p>}
            </form>
        </div>

    )
};

export default Login;