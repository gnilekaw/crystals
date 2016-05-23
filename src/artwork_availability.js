import React from 'react';
import ArtworkAttributeSelect from './artwork_attribute_select';

const composeArtworkAvailability = (Component) => {
  class ArtworkAvailability extends React.Component {
    constructor(props) {
      super(props);
      this.state = {artwork: props.artwork, disabled: false};
      this.setState = this.setState.bind(this);
    }

    render() {
      return (
        <Component {...this.props} {...this.state}
                   artworkFieldName="availability"
                   value={this.state.artwork.availability}
                   setState={this.setState} />
      );
    }
  }

  ArtworkAvailability.propTypes = {
    artwork: React.PropTypes.object,
    options: React.PropTypes.array
  };

  return ArtworkAvailability;
}

const ArtworkAvailability = composeArtworkAvailability(ArtworkAttributeSelect);

export default ArtworkAvailability;
