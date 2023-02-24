import React from 'react';
import { Col } from 'react-bootstrap';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesShownForRender: this.props.moviesShown
        };
    }
    render() {
        let shownMovies = (this.state.moviesShownForRender).map((movie, index) => {
            return <li key={index}>
                title: {movie.original_title} | description: {movie.overview}
            </li>
        });
        return(
         <>
        <Col>{shownMovies}</Col>
        </>
        )
    }
}

export default Movies;