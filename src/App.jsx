// App.js
import React, { useEffect, useState } from "react";
import Topo from "./components/Topo";
import Rodape from "./components/Rodape";
import Livro from "./components/Livro"
import Frontend from "./components/Frontend";
import Programacao from "./components/Programacao";
import Design from "./components/Design";
import Catalogo from "./components/Catalogo";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import axios from "axios";
import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import { CarrinhoProvider } from "./components/CarrinhoContext";
import Carrinho from "./components/Carrinho"; 
import Checkout from "./components/CheckOut"; 


const LivroRouteHandler = ({ livros }) =>{
    const {livroSlug} = useParams();
    const livro = livros.find(l => l.slug === livroSlug);

    if(!livro) return <NotFound/>;

    return <Livro livro={livro}/>
};

const App = () => {
    const [livros, setLivros] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const carregarLivros = async () => {
            try{
                const response = await axios.get("/api/todosOsLivros.json");
                setLivros(response.data);
            }catch(error){
                console.error("Erro ao carregar livros:",error);
                setErro("Falha ao carrrgar os livros. Tente novamente mais tarde!")
            }
        };
        carregarLivros();
    },[]);


    return (
        <CarrinhoProvider>
            <>
                <Topo />
                <main className="principal">
                    {erro && <p className="erro">{erro}</p>}
                    <Routes>
                        <Route path="/" element={<Home livros={livros}/>}/>
                        <Route path="/frontend" element={<Frontend livros={livros}/>}/>
                        <Route path="/programacao" element={<Programacao livros={livros}/>}/>
                        <Route path="/design" element={<Design livros={livros}/>}/>
                        <Route path="/catalogo" element={<Catalogo livros={livros}/>}/>
                        <Route path="/livro/:livroSlug"
                               element={<LivroRouteHandler livros = {livros}/>}
                        />
                        <Route path="/notfound" element={<NotFound/>}/>
                        <Route path="/carrinho" element={<Carrinho />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>
                <Rodape />
            </>
        </CarrinhoProvider>
    );
}

export default App;