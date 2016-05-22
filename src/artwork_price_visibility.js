import ArtworkAttributeSelect from './artwork_attribute_select';

const composeArtworkPriceVisibility = (Component) => {
  class ArtworkPriceVisibility extends React.Component {
    constructor(props) {
      super(props);
      this.state = {artwork: props.artwork, disabled: false};
      this.setState = this.setState.bind(this);
    }

    priceVisibility (artwork) {
      if (artwork.display_price_range) return 'range';
      if (artwork.price_hidden) return 'hidden';
      return 'exact';
    }

    render() {
      return (
        <Component {...this.props} {...this.state}
                   artworkFieldName="display_price"
                   value={this.priceVisibility(this.state.artwork)}
                   setState={this.setState} />
      );
    }
  }

  ArtworkPriceVisibility.propTypes = {
    artwork: React.PropTypes.object,
    options: React.PropTypes.array
  };

  return ArtworkPriceVisibility;
}

const ArtworkPriceVisibility = composeArtworkPriceVisibility(ArtworkAttributeSelect);

export default ArtworkPriceVisibility;
