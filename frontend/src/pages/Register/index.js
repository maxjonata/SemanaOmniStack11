import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';


import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); //faz acesso a páginas diretamente

    async function handleRegister(e) { //recebe o evento no qual está sendo usada
        e.preventDefault(); //Impede o tratamento default, que no caso do submit é recarregara página

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //redireciona para a página
        } catch(err) {
            alert('Erro no cadastro, tente novamente');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //arrowFunction (função reduzida)
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} //arrowFunction (função reduzida)
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} //arrowFunction (função reduzida)
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} //arrowFunction (função reduzida)
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} //arrowFunction (função reduzida)
                        />
                    </div>

                    <button className="button" type="Submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}