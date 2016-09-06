import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import { serializeFormDataToObject } from '../helpers/dom_utils';

/*
 * States: inited, updating, updated, errored.
 */

const ArtworkAttributeUpdatable = Wrapped => {
  class ArtworkAttributeUpdatableComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {artwork: this.props.artwork, state: "inited"};
      this.onSubmit = this.onSubmit.bind(this);
    }

    /*
     * Custom formatting of data for updating the artwork or edition set.
     *
     * @param {object} data Updated data object; usually serialized from the form.
     * @return {object} Formatted data object ready to be sent to the server.
     */
    prepareData(data) {
      const prepared = {};
      const key = this.props.isEditionSet ? "edition_set" : "artwork";

      prepared[key] = data;
      return prepared;
    }

    onSubmit(e) {
      e.preventDefault();
      this.setState({artwork: this.state.artwork, state: "updating"});

      const $form = $(e.target);
      const formData = serializeFormDataToObject($form);
      $.ajax({
        url: this.props.saveUrl,
        // TODO: PATCH requests won't send data correctly in capybara-webkit/Qt.
        // Let's use PUT for now.
        // https://github.com/thoughtbot/capybara-webkit/issues/553
        type: "PUT",
        data: this.prepareData(formData),
        dataType: "json"
      }).done((data) => {
        if (_.has(data, "error")) {
          this.setState({artwork: this.props.artwork, state: "errored"});
          $form.trigger('error.crystals', [data]);
        } else {
          const updated = _.pick(data, _.keys(this.props.artwork));
          this.setState({artwork: updated, state: "updated"});
        }
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
