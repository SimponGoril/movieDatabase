import React, { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import 'purecss/build/pure.css'
import styled from 'styled-components'

import { getMoviesByTitle } from "../utils/moviesService"
import { MoviesList } from "../components/moviesList"
import { MovieListItem } from "../types/movies"
import { LoadingSpinner } from '../components/loadingSpinner'

const MovieSearch = styled.div`
    background-color: #fe4a49;
    display: flex;
`;

const LoadingContainer = styled.div`
    padding-top: 5rem;
    display: flex;
    justify-content: center;
`;

enum SortBy {
    'Name' = 1,
    'ReleaseDate' = 2,
    'VoteAverage' = 3
}

export const MainView: FC = () => {
    const [movies, setMovies] = useState<MovieListItem[]>()
    const [searchTitle, setSearchTitle] = useState<string>("")
    const [sortBy, setSortBy] = useState<number>(1)
    const [isLoadingList, setIsLoadingList] = useState<boolean>(false)

    useEffect(() => {
            const validationTimer = setTimeout(() => {onUserStopTyping(); }, 700)
            return () => {
                clearTimeout(validationTimer);
            };
        },
        [searchTitle]
    );

    useEffect(() => {
        if (movies) {
            const result = [...movies.sort(movieSort)]
            setMovies(result);
            }
        },
        [sortBy]
    )

    const movieSort = (a: MovieListItem, b: MovieListItem) => {
        switch (sortBy) {
            case SortBy.Name:
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                break;
            case SortBy.ReleaseDate:
                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
                break;
            case SortBy.VoteAverage:
                return b.vote_average - a.vote_average
            break
        }
    }

    const onUserStopTyping = async () => {
        if (searchTitle) {
            setIsLoadingList(true)
            const result = await getMoviesByTitle(searchTitle);
            result.sort(movieSort)
            setMovies(result);
            setIsLoadingList(false)
        }
    }

    const getLoadingSpinner = () => {
        return <LoadingContainer>
            <LoadingSpinner />
        </LoadingContainer>
    }

    const preventEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <div>
            <MovieSearch className="pure-g">
                <div className="pure-u-1-4"/>
                <div className="pure-u-1-2">
                    <h1>&#127909; Search Movie Titles</h1>
                        <form className="pure-form">
                            <fieldset>
                                <input id="searchText"
                                       type="text"
                                       autoFocus={true}
                                       size={50}
                                       value={searchTitle}
                                       onKeyDown={preventEnter}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSearchTitle(e.target.value)}}
                                       placeholder='Example: "Terminator 2"' /> Sort by &nbsp;
                                <select value={sortBy} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(Number(e.target.value))}>
                                    <option value={1}>Name</option>
                                    <option value={2}>Release Date</option>
                                    <option value={3}>Vote Average</option>
                                </select>
                            </fieldset>
                        </form>
                </div>
                <div className="pure-u-1-4"/>
            </MovieSearch>
            <div>
                {isLoadingList ? getLoadingSpinner() : null}
                <MoviesList movies={movies} />
            </div>
            <Outlet />
        </div>
    )
}