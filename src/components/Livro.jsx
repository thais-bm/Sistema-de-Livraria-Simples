import React, {useState} from 'react'
import { useCarrinho } from './CarrinhoContext';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

const Livro = ({ livro }) => {
  const { adicionar } = useCarrinho();
  const navigate = useNavigate(); // pra ficar mandando o usuario pros 'cantos'

  // hook pra quantidade
  // usar localstorage -> apenas pra simular o livro acabando e sem mexer no json
  const getEstoqueIncial = () => {
    const estoqueSalvo = localStorage.getItem(`estoque_${livro.id}`)
    // Se houver algo salvo, retorna esse valor. Senão, retorna 5.
    return estoqueSalvo != null ? parseInt(estoqueSalvo, 10) : 5;
  };

  const [quantidade, setQuantidade] = useState(getEstoqueIncial());

  const handleComprar = () => {
    if (quantidade === 0) {
      toast('Desculpe, o estoque deste livro acabou!');
    }
    else{
    const novaQuantidade = quantidade - 1;
    setQuantidade(novaQuantidade);

    // Salva no localStorage
    localStorage.setItem(`estoque_${livro.id}`, novaQuantidade.toString());
    setTimeout(() => {
      toast('Você será redirecionado para o carrinho...');
    }, 1000);
    adicionar(livro);
    navigate('/carrinho');
    }
  
  };

  return (
    <main className='principal'>
      <div className='pag-livro'>
        <h2>{livro.titulo}</h2>
        <div className='livro'>
          <img src={`/imagens/capas/${livro.id}.jpg`} alt='Thumbnail da capa do livro...' />
          <ul id='livro-temp'>
            <li>ISBN: {livro.isbn}</li>
            <li>Ano: {livro.ano}</li>
            <li>Páginas: {livro.paginas}</li>
            <li>Preço: R$ {livro.preco}</li>
            <li>Quantidade no Estoque: {quantidade}</li>
          </ul>
          <h3 style={{color: 'black'}}>Descrição do Livro</h3>
          <p style={{color: 'black'}}>{livro.descricao}</p>
          <button id="buy-btn" onClick={handleComprar}>
            <img src="https://cdn-icons-png.flaticon.com/512/155/155949.png" alt="a shopping cart icon" />
            Comprar Agora
            </button>
          <ToastContainer />
        </div>
      </div>
    </main>
  );
}

export default Livro;