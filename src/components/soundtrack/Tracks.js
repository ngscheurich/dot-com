import React, { Component } from "react";
import PropTypes from "prop-types";
import Masonry from "react-masonry-component";
import Track from "./Track";

import "../../styles/soundtrack.css";

function sizes() {
  const screenWidth =
    typeof window !== "undefined" ? window.screen.availWidth : 0;

  if (screenWidth <= 480) {
    return { small: 140, large: 300 };
  } else if (screenWidth <= 768) {
    return { small: 160, large: 360 };
  } else {
    return { small: 180, large: 380 };
  }
}

const masonryOptions = {
  gutter: 20,
  transitionDuration: 0,
  fitWidth: true
};

class Tracks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTrack: {}
    };

    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.startPlayback = this.startPlayback.bind(this);
    this.stopPlayback = this.stopPlayback.bind(this);
  }

  handleTrackClick(track) {
    if (track === this.state.currentTrack) {
      this.stopPlayback();
      this.setState({ currentTrack: {} });
    } else {
      this.startPlayback(track.previewUrl);
      this.setState({ currentTrack: track });
    }
  }

  startPlayback(audioUrl) {
    this.stopPlayback();
    this.audio.src = audioUrl;
    this.audio.load();
    this.audio.play();
  }

  stopPlayback() {
    this.audio.pause();
  }

  componentDidMount() {
    this.audio = document.createElement("audio");
  }

  render() {
    return (
      <Masonry options={masonryOptions} className="tracks center">
        {this.props.tracks.map(track => {
          const flipped = track === this.state.currentTrack ? true : false;

          return (
            <Track
              key={track.id}
              track={track}
              sizes={sizes()}
              flipped={flipped}
              handleClick={this.handleTrackClick}
            />
          );
        })}
      </Masonry>
    );
  }
}

Tracks.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default Tracks;
