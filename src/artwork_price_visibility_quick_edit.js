import React from 'react';
import InlineDropdown from './base/inline_dropdown';
import ArtworkAttributeUpdatable from './decorators/artwork_attribute_updatable';

class InlineArtworkPriceVisibility extends React.Component {
  priceVisibilityValue (artwork) {
    if (artwork.display_price_range) return 'range';
    if (artwork.price_hidden) return 'hidden';
    return 'exact';
  }

  render() {
    return <InlineDropdown {...this.props}
      className="crystals-artwork-price-visibility"
      object={this.props.artwork}
      attribute="display_price"
      value={this.priceVisibilityValue(this.props.artwork)}
    />;
  }
}

InlineArtworkPriceVisibility.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  t: React.PropTypes.object
};

InlineArtworkPriceVisibility.defaultProps = {
};

/*
 * ArtworkPriceVisibilityQuickEdit is an InlineDropdown component decorated by
 * ArtworkAttributeUpdatable.
 */
const ArtworkPriceVisibilityQuickEdit = ArtworkAttributeUpdatable(InlineArtworkPriceVisibility);

ArtworkPriceVisibilityQuickEdit.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  saveUrl: React.PropTypes.string.isRequired,
  isEditionSet: React.PropTypes.bool,
  options: React.PropTypes.array.isRequired
}

ArtworkPriceVisibilityQuickEdit.defaultProps = {
  isEditionSet: false
}

export default ArtworkPriceVisibilityQuickEdit;
