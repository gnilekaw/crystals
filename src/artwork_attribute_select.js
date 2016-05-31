import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
// Instead of doing
//   import { Form, FormGroup, FormControl } from 'react-bootstrap';
// Let's reduce the size of the bundle by requiring individual files.
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

class ArtworkAttributeSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.form)).on("ajax:success", (e, artwork) => {
      const updated = _.pick(artwork, _.keys(this.props.artwork));
      this.props.setState({artwork: updated, disabled: false});
    });
  }

  onChange(e) {
    this.props.setState({artwork: this.props.artwork, disabled: true});
    $(ReactDOM.findDOMNode(this.refs.form)).submit();
  }

  // Reverse lookup for option label by value. We can optimze this later.
  optionLabel(value) {
    for (var option of this.props.options) {
      if (option[1] == value) return option[0];
    }
  }

  render() {
    return (
      <div>
        <div className="form-control-select-readonly"
             data-component-mode="readonly">{this.optionLabel(this.props.value)}</div>
        <Form inline
              data-component-mode="editable"
              ref="form" method="put" data-remote data-type="json"
              action={`/artworks/${this.props.artwork._id}`}>
          <FormGroup>
            <input name="ignore_blank" value="true" type="hidden" />
            <FormControl componentClass="select"
                         name={`artwork[${this.props.artworkFieldName}]`}
                         value={this.props.value}
                         disabled={this.props.disabled}
                         onChange={this.onChange.bind(this)}>
              {this.props.options.map(o => <option key={o[1]} value={o[1]}>{o[0]}</option>)}
            </FormControl>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ArtworkAttributeSelect;
