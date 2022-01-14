import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovieDetailView } from './views/movieDetailView';
import { MainView } from "./views/main";

ReactDOM.render(
       <BrowserRouter>
           <Routes>
                 <Route path="/" element={<MainView />} />
                 <Route path="detail/:movieId" element={<MovieDetailView />} />
           </Routes>
       </BrowserRouter>
       ,
       document.getElementById('root'));