import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css'


const NotFound = () => {
    const estiloPrincipal = {
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        fontSize: '30px',
        fontFamily: 'Roboto',
    };

    const estiloImagem = {
        width: '250px',
        margin: '30px auto',
    };

    const estiloParagrafo = {
        margin: '10% auto',
        textAlign: 'justify',
        padding: '10px',
        fontSize: '15px',
    }

    const retornar = {
        margin: '15% 15% auto',
        display: 'flex',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '10px',
        justifyContent: 'center',
    }

    return (
      <main className='principal'>
        <h2 style={estiloPrincipal}>404</h2>
          <img src='/imagens/error.gif' alt="404" style={estiloImagem}/>
        <p style={estiloParagrafo}>
            Até os melhores exploradores se perdem às vezes. 🧭<br />
            Este caminho não leva a lugar nenhum, mas você pode voltar para a página inicial
            <Link to="/" style={retornar}className="link_voltar"> ⬅ Retornar para a página inicial</Link>.
        </p>
      </main>
  );
};

export default NotFound;