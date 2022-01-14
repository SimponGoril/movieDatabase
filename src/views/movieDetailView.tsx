import React, {FC, useEffect, useState} from 'react'
import 'purecss/build/pure.css'
import styled from 'styled-components'

import { MovieDetail } from '../components/movieDetail'
import { MovieDetails } from 'types/movies'
import { Link, useParams } from 'react-router-dom'
import { getMovieById } from '../utils/moviesService'
import { LoadingSpinner } from '../components/loadingSpinner'

const MovieDetailViewStyles = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 50px;
    text-align: center;
`

const MovieDetailViewBackButton = styled.div`
    font-size: 4rem;
    a {
        text-decoration: none !important;
    }
`

export const MovieDetailView: FC = () => {
    const [movieDetailInfo, setMovieDetailInfo] = useState<MovieDetails>()
    const params = useParams()

    useEffect(() => {
        async function fetchMovieDetails() {
            const details = await getMovieById(Number(params.movieId))
            setMovieDetailInfo(details)
        }
        fetchMovieDetails()

    }, [])

    return (<MovieDetailViewStyles>
        <MovieDetailViewBackButton><Link to={`/`}>&#128281;</Link></MovieDetailViewBackButton>
        {movieDetailInfo ? <MovieDetail movie={movieDetailInfo} /> : <LoadingSpinner />}
    </MovieDetailViewStyles>)
}