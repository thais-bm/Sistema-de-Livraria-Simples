import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from './CarrinhoContext';

const Carrinho = () => {
  // Obtém os dados e funções do contexto do carrinho
  const { carrinho, remover, valorTotal } = useCarrinho();
  const navigate = useNavigate();
  
  return (
    // Renderiza o carrinho de compras
    <section className="cart">
      <h2>Carrinho de Compras</h2>

      {carrinho.length === 0 ? (
        // Seção para quando o carrinho está vazio
        <section className="carrinho-vazio">
          <p>Seu carrinho está vazio.
            <br />
            Por que não dá uma olhada em nossos <Link to="/" id='link'>últimos lançamentos</Link>?
          </p>
          <img 
            src='/imagens/empty_cart.gif' 
            alt="Carrinho vazio" 
            width={200} 
          />
          <button onClick={() => navigate('/')}>
            Voltar para a loja
          </button>
        </section>
      ) : (
        // Seção para quando há itens no carrinho
        <>
          <section className="lista-itens-carrinho">
            {carrinho.map((item) => (
              <div className="card-carrinho" key={item.id}>
                <div className="thumb">
                  <img src={`/imagens/capas/${item.id}.jpg`} alt={`Capa do livro ${item.titulo}`} />
                </div>
                <div className="detalhes-item">
                  <Link to={`/livro/${item.slug}`}> 
                    <h3>{item.titulo}</h3>
                  </Link>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço Unitário: R$ {item.preco}</p>
                </div>
                <div className="acoes-item">
                  <p className="subtotal-item">Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  <button className="btn-remover" onClick={() => remover(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </section>
          
          {/* Seção do resumo do pedido */}
          <section className="resumo-carrinho">
            <h3 style={
              {
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'green',
                marginBottom: '20px'
              }
            }>Valor Total: R$ {valorTotal.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="btn-finalizar">Finalizar Compra</button>
            </Link>
          </section>
        </>
      )}
    </section>
  );
};

export default Carrinho;