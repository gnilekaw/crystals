import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import { serializeFormDataToObject } from '../helpers/dom_utils';

const ArtworkAttributeUpdatable = Wrapped => {
  class ArtworkAttributeUpdatableComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {artwork: this.props.artwork, loading: false};
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
      e.preventDefault();
      this.setState({artwork: this.state.artwork, loading: true});

      const data = serializeFormDataToObject($(e.target));
      $.ajax({
        url: this.props.saveUrl,
        type: "PATCH",
        data: {artwork: data},
        dataType: "json"
      }).done((artwork) => {
        const updated = _.pick(artwork, _.keys(this.props.artwork));
        this.setState({artwork: updated, loading: false});
      });
    }

    render() {
      return <Wrapped {...this.props} {...this.state}
        onSubmit={this.onSubmit}
      />;
    }
  }

  return ArtworkAttributeUpdatableComponent;
}

export default ArtworkAttributeUpdatable;
