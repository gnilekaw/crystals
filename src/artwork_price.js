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

// TODO: The HOC pattern hides the applicable props for the decorated component,
// one has to look at the decorator to see the details of the props.
export default ArtworkAttributeUpdatable(InlineArtworkPrice);
