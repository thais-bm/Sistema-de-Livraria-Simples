import React from 'react'
import {Link} from 'react-router-dom'

const Catalogo = ( {livros} ) => {
  return (
    <main className='principal'>
        <h2>Categoria Frontend</h2>
        <ol>
            {
                livros
                .filter( livro => livro.categoria === 'frontend' )
                .map( livro => (
                    <li className='book-list' key={livro.slug}>
                        <Link to={`/livro/${livro.slug}`}>
                            {livro.titulo}
                        </Link>
                    </li>
                ))
            }
        </ol>
        <h2>Categoria Programação</h2>
        <ol>
            {
                livros
                .filter( livro => livro.categoria === 'programacao' )
                .map( livro => (
                    <li className='book-list' key={livro.slug}>
                        <Link to={`/livro/${livro.slug}`}>
                            {livro.titulo}
                        </Link>
                    </li>
                ))
            }
        </ol>

        <h2>Categoria Design</h2>
        <ol>
            {
                livros
                .filter( livro => livro.categoria === 'design' )
                .map( livro => (
                    <li className='book-list' key={livro.slug}>
                        <Link to={`/livro/${livro.slug}`}>
                            {livro.titulo}
                        </Link>
                    </li>
                ))
            }
        </ol>
    </main>
  )
}

export default Catalogo