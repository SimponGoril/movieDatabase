import React, {FC} from "react"
import styled from 'styled-components'

import { MovieListItem } from "../types/movies"
import { Link } from "react-router-dom"

interface MoviesListProps {
    movies?: MovieListItem[]
}

const MoviesListStyles = styled.div`
    float: left;
    line-height: 30px;
`;

const MoviesListItem = styled.li`
    a {
        text-decoration: none;
        color: black;
    }
    &:hover {
        background-color: #e6e6ea;
        cursor: pointer;
    }
`;

export const MoviesList: FC<MoviesListProps> = ({movies = []}) => {

    const getMoviesListItems = () => {
        return movies.map((m:MovieListItem, i: number ) => {
            return <MoviesListItem key={m.id}>
                    <Link
                    to={`/detail/${m.id}`}
                    key={m.id}>
                    {m.title} - ({new Date(m.release_date).getFullYear()}) - {getMovieStars(m.vote_average)}
                </Link>
                </MoviesListItem>
        })
    }

    const getMovieStars = (rating: number) => {
        if (rating === 0) {
            return <span>&#128683;</span>
        }

        const stars = [];

        const getStar = (i: number) => {
            return <span key={i}>&#11088;</span>
        }

        for (let i = 0; i < rating; i++) {
            stars.push(getStar(i))
        }
        return stars
    }

    return (<MoviesListStyles>
            <ul>
                {getMoviesListItems()}
            </ul>
        </MoviesListStyles>
    )
}