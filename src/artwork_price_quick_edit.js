import React from 'react';
import InlineTextInput from './base/inline_text_input';
import ArtworkAttributeUpdatable from './decorators/artwork_attribute_updatable';

class InlineArtworkPrice extends React.Component {
  render() {
    return <InlineTextInput {...this.props}
      className="crystals-artwork-price"
      object={this.props.artwork}
      attribute="price_listed"
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
  t: React.PropTypes.object
}

ArtworkPriceQuickEdit.defaultProps = {
}

export default ArtworkPriceQuickEdit;
