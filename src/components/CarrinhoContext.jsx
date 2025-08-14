import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => {
  // Hook para acessar o contexto do carrinho sem precisar chamar um por um
  // isso remove o 'import { useContext } from 'react';' de cada componente
  
  // mt melhor escrever: const { carrinho, adicionar } = useCarrinho();
  // e não: const { carrinho, adicionar } = useContext(CarrinhoContext);

  return useContext(CarrinhoContext);
};

export const CarrinhoProvider = ({ children }) => {
  // Estado para armazenar os itens do carrinho
  const [carrinho, setCarrinho] = useState([]);

  // Adicionar ao carrinho
  // Retorna um novo array com o item adicionado
  // Se o item ta la
    // -> anda pelo array 'antigo' buscando por ID igual
    // -> se achar, incrementa a quantidade em + 1
  // Se não existir
    // -> copia o array antigo (pelo ...) e copia o novo livro, fazendo o atributo quantidade ser 1
    // -> junta tudo e retorna o novo array
  const adicionar = (livro) => {
    setCarrinho((prevCarrinho) => {
      const itemNoCarrinho = prevCarrinho.find((item) => item.id === livro.id);
      if (itemNoCarrinho) {
        return prevCarrinho.map((item) => item.id === livro.id ? { ...item, quantidade: item.quantidade + 1 } : item);
      }
      return [...prevCarrinho, { ...livro, quantidade: 1 }];
    });
  };

  // Remover do carrinho
  // retorna um array novo sque adiciona todo mundo menos o item com o ID passado
  const remover = (livroId) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.id !== livroId)
    );
  };

  // Limpar o carrinho
  // Retorna um array vazio
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // ele calcula o valor total do carrinho
  // o reduce tem 2 valores: 
  // o valor acumulado e 'valor' atual
  const valorTotal = carrinho.reduce((total, livro) => total + (livro.preco * livro.quantidade), 0);

  // Retorna o contexto do carrinho com os métodos e o estado
  // value: o que vai ser acessado pelo hook useCarrinho
  // children: o que vai ser renderizado dentro do provider -> que são todos os componentes dentro do App.jsx
  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, remover, limparCarrinho, valorTotal }}>
      {children}
    </CarrinhoContext.Provider>
  );
};