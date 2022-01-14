import React, {FC} from "react";
import styled from 'styled-components';

import {MovieDetails} from "../types/movies";

const MovieDetailStyles = styled.div`
    padding-right: 2rem;
    flex-direction: column;
`

const MovieDetaillInfoItem = styled.div`
    text-align: center;
    padding-left: 2rem;
    padding-right: 2rem;
    margin:auto;
`

const MovieDetailPoster = styled.img`
    width: 50%;
`

interface MovieDetailProps {
    movie: MovieDetails;
}

export const MovieDetail: FC<MovieDetailProps> = ({movie}) => {

    return (<MovieDetailStyles>
                <MovieDetaillInfoItem><h2 id="MovieDetailTitle">{movie.title}</h2></MovieDetaillInfoItem>
                <MovieDetaillInfoItem><h4 id="MovieDetailTagline">{movie.tagline ? <i>"{movie.tagline}"</i> : null}</h4></MovieDetaillInfoItem>
                <MovieDetaillInfoItem><p id="MovieDetailOverView">{movie.overview}</p></MovieDetaillInfoItem>
                <MovieDetaillInfoItem><p id="MovieDetailBudget">{movie.budget ? <span>Budget: {movie.budget}$</span> : null}</p></MovieDetaillInfoItem>
                <MovieDetaillInfoItem><p id="MovieDetailRuntime">{movie.runtime ? <span>Runtime: {movie.runtime} Minutes</span> : null}</p></MovieDetaillInfoItem>
                <MovieDetaillInfoItem><p id="MovieDetailReleased">Released: {movie?.status === 'Released' ? <span>&#9989;</span> : <span>&#10060;</span>}</p></MovieDetaillInfoItem>
                <MovieDetaillInfoItem><MovieDetailPoster id="MovieDetailPoster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/></MovieDetaillInfoItem>
        </MovieDetailStyles>)
}