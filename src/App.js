import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Template } from './components/MainComponents';

import Header from './components/partials/Header';
import Routes from './Routes';
import Footer from './components/partials/Footer';

const Page = () => {
  return (
    <BrowserRouter>
      <Template>
        <Header/>
        <Routes/>
        <Footer/>
      </Template>
    </BrowserRouter>
  );
}

export default Page;
