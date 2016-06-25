import React from 'react';
import InlineTextInput from './base/inline_text_input';
import ArtworkAttributeUpdatable from './decorators/artwork_attribute_updatable';

class InlineArtworkPrice extends React.Component {
  display() {
    return this.props.artwork && this.props.artwork.internal_display_price;
  }

  render() {
    return <InlineTextInput {...this.props}
      placeholder="e.g. 3500"
      className="crystals-artwork-price"
      object={this.props.artwork}
      attribute="price_listed"
      display={this.display()}
    />;
  }
}

InlineArtworkPrice.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  t: React.PropTypes.object
};

InlineArtworkPrice.defaultProps = {
};

/*
 * ArtworkPriceQuickEdit is an InlineArtworkPrice component decorated by
 * ArtworkAttributeUpdatable.
 */
const ArtworkPriceQuickEdit = ArtworkAttributeUpdatable(InlineArtworkPrice);

ArtworkPriceQuickEdit.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  saveUrl: React.PropTypes.string.isRequired,
  isEditionSet: React.PropTypes.bool,
  t: React.PropTypes.object
}

ArtworkPriceQuickEdit.defaultProps = {
  isEditionSet: false
}

export default ArtworkPriceQuickEdit;
