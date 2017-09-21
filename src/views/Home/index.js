import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import CategoryCard from "../../components/CategoryCard";

class Home extends Component {
  render() {
    return (
      <div>
        <Header textAlign="center">CATEGORIES</Header>

        <CategoryCard
          src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg"
          name="Apples"
        />

        <CategoryCard
          src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg"
          name="Apples"
        />

        <CategoryCard
          src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg"
          name="Apples"
        />

        <CategoryCard
          src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg"
          name="Apples"
        />
      </div>
    );
  }
}

export default Home;
