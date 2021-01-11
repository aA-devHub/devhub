import React, { Component } from 'react';

import FilterCards from '../project/FilterCards';
import TinderCard from '../project/TinderCard';
import Cards from '../project/ProjectCards';

class MainPage extends Component {
  render() {
    return (
      <div>
        <TinderCard />
        <FilterCards />
        <Cards />
      </div>
    );
  }
}

export default MainPage;
