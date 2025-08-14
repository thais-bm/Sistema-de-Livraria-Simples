import React, { useState } from 'react';
import { useCarrinho } from './CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS do react-toastify

const notify = () => toast.success("Compra realizada com sucesso!");

const Checkout = () => {
  const { valorTotal, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  // Estado para armazenar o método de pagamento selecionado
  const [metodoPagamento, setMetodoPagamento] = useState(null);

  // Função para lidar com a finalização da compra
    // chama a função limparCarrinho do contexto
    // notifica a compra realizada com sucesso
    // e redireciona para a página inicial após 2.5 segundos
  const handleFinalizarCompra = (event) => {
    if (event) {
      event.preventDefault();
    }
    limparCarrinho();
    notify();
    setTimeout(() => {
      navigate('/');
    }, 2500); //tava 2 e agora é 2.5 segundos, ficou melhor
  };

  // Componente reutilizável para o formulário de cartão
  const FormularioCartao = ({ comParcelamento }) => {
    // Gera as opções de parcelamento
    const opcoesParcelamento = () => {
      const parcelas = [];
      for (let i = 1; i <= 6; i++) {
        const valorParcela = (valorTotal / i).toFixed(2);
        parcelas.push(
          <option key={i} value={i}>
            {i}x de R$ {valorParcela} {i > 1 ? 'sem juros' : ''}
          </option>
        );
      }
      return parcelas;
    };

    // Renderiza o formulário de cartão
    // se tem parcelamento -> renderiza o select com as opções
    // se não tem -> renderiza o formulário normal
    return (
      <form onSubmit={handleFinalizarCompra} className="form-checkout">
        <input type="text" placeholder="Nome no Cartão" required />
        <input type="tel" inputMode="numeric" placeholder="Número do Cartão" maxLength="16" required />
        <div className="form-row">
          <input type="text" placeholder="Validade (MM/AA)" required maxLength="5" />
          <input type="tel" inputMode="numeric" placeholder="CVV" maxLength="3" required />
        </div>

        {comParcelamento && (
          <select defaultValue="" required>
            <option value="" disabled>Selecione o número de parcelas</option>
            {opcoesParcelamento()}
          </select>
        )}

        <button type="submit" className="btn-pagar">Pagar Agora</button>
      </form>
    );
  };

  // Renderiza o componente de checkout
  return (
    // Adicionamos a classe 'pagina-checkout' para aplicar os estilos
    <>
    <h2 style={
        {
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '20px',
          width: '100%',
        }
      }>Finalizar Compra</h2>

      <main className="principal pagina-checkout">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />

      <div className="checkout-container">

        <div className="resumo-pedido">
          <h4>Resumo do Pedido</h4>
          <div className="total-pedido">
            <span>Valor Total:</span>
            <strong>R$ {valorTotal.toFixed(2)}</strong>
          </div>
        </div>

        <div className="selecao-pagamento">
          <h4>Escolha a forma de pagamento:</h4>
          <div className="botoes-pagamento">
            <button onClick={() => setMetodoPagamento('pix')} className={metodoPagamento === 'pix' ? 'ativo' : ''}>Pix</button>
            <button onClick={() => setMetodoPagamento('credito')} className={metodoPagamento === 'credito' ? 'ativo' : ''}>Crédito</button>
            <button onClick={() => setMetodoPagamento('debito')} className={metodoPagamento === 'debito' ? 'ativo' : ''}>Débito</button>
          </div>
        </div>

        {/* Renderiza o formulário de pagamento baseado no método selecionado usando um if inline com &&*/}
        {metodoPagamento === 'pix' && (
          <div className="metodo-pagamento-card">
            <h4>Pague com Pix</h4>
            <p>Escaneie o QR Code abaixo com o app do seu banco:</p>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://youtu.be/ycHVUvvOwzY?feature=shared`} 
              alt="QR Code para pagamento via Pix" 
              className="qr-code"
            />
            <button onClick={() => handleFinalizarCompra()} className="btn-pagar">Confirmar Pagamento</button>
          </div>
        )}

        {metodoPagamento === 'credito' && (
          <div className="metodo-pagamento-card">
            <h4>Pagamento com Cartão de Crédito</h4>
            <FormularioCartao comParcelamento={true} />
          </div>
        )}

        {metodoPagamento === 'debito' && (
          <div className="metodo-pagamento-card">
            <h4>Pagamento com Cartão de Débito</h4>
            <FormularioCartao comParcelamento={false} />
          </div>
        )}
      </div>
    </main>
    </>
    
  );
};

export default Checkout;
