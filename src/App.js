import React from "react";
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  // considering axios loading speed, use async
  getMovies = async () => {
    // waiting, when loading is complete, then execute
    // => const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    // using console.log find data that we need = console.log(movies);
    // found data => console.log(movies.data.data.movies);
    // using es6
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");//우선순위정렬사용

    // this.setState({ movies:movies }) = this.setState({ movies })
    // change two state
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render () {
    const { isLoading, movies } = this.state;

    return (
      <div>{isLoading ? 
        "Loding..." 
        : movies.map(movie => (
          <Movie
            key={movie.id}
            id={movie.id} 
            year={movie.year} 
            title={movie.title} 
            summary={movie.summary} 
            poster={movie.medium_cover_image} 
          />
        ))}
      </div>
    );
  }
}

export default App;
