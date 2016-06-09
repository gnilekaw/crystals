import React from 'react';
import InlineDropdown from './base/inline_dropdown';
import ArtworkAttributeUpdatable from './decorators/artwork_attribute_updatable';

class InlineArtworkAvailability extends React.Component {
  render() {
    return <InlineDropdown {...this.props}
      className="crystals-artwork-availability"
      object={this.props.artwork}
      attribute="availability"
      value={this.props.artwork.availability}
    />;
  }
}

InlineArtworkAvailability.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  t: React.PropTypes.object
};

InlineArtworkAvailability.defaultProps = {
};

/*
 * ArtworkAvailabilityQuickEdit is an InlineDropdown component decorated by
 * ArtworkAttributeUpdatable.
 */
const ArtworkAvailabilityQuickEdit = ArtworkAttributeUpdatable(InlineArtworkAvailability);

ArtworkAvailabilityQuickEdit.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  saveUrl: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
}

ArtworkAvailabilityQuickEdit.defaultProps = {
}

export default ArtworkAvailabilityQuickEdit;
