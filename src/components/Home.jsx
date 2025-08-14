import React from "react";
import { Link } from 'react-router-dom';
import { useCarrinho } from './CarrinhoContext';


const Home = ({ livros }) => {
  const { adicionar } = useCarrinho();

  return (
    <main className='principal'>
      <h2>Últimos lançamentos</h2>
      {livros
        .slice(0, 6)
        .map((livro) => (
          <div className='card' key={livro.id}>
            <div className='thumb'>
              <img
                src={`/imagens/capas/${livro.id}.jpg`}
                alt="Thumbnail da capa do livro..."
              />
            </div>
            <Link to={`/livro/${livro.slug}`}>
              <div className='detalhes'>
                <h3>{livro.titulo}</h3>
                <p>{livro.descricao.slice(0, 130) + "..."}</p>
                <p className="read-more">Leia mais</p>
              </div>
            </Link>
            <p className="preco">R${livro.preco}</p>
          </div>
        ))}
    </main>
  );
};

export default Home;