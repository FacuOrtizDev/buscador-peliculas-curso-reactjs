import React, { useState } from 'react'

export const BuscadorPeliculas = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '675e09544bdb4af1dd7ec5b84e9170be'
    
    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleinputchange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }
    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
            console.log(data);
            
        } catch (error) {
        console.error('Ha ocurrido un error: ', error);
           
        }
        
    }

    return (

        <div className='container'>

            <h1>Buscador Peliculas</h1>
            <form onSubmit={handleSubmit} >
                <input 
                type="text"
                placeholder='Escribí una película'
                value={busqueda}
                onChange={handleinputchange}
                />

                <button type="submit" className='search-buttton'>Buscar</button>
            </form>


            <div className='movie-list'>
                {peliculas.map( (pelicula) => (
                    <div key={pelicula.id} className='movie-card'>
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                 ))}

            </div>


        </div>
    )
}
