import React from 'react';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesShownForRender: this.props.moviesShown
        };
    }
    render() {
        let shownMovies = (this.state.moviesShownForRender).map((movie, index) => {
            return <img src=
        });
        return <div>{shownMovies}</div>
    }
}

export default Movies;