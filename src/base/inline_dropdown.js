import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import { t } from '../helpers/translation';
import { appendClasses } from '../helpers/dom_utils';

class InlineDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  // Naive reverse lookup for option label by value.
  optionLabelByValue(value) {
    for (var option of this.props.options) {
      if (option[1] == value) return option[0];
    }
  }

  /*
   * Submit form manually and will trigger the onSubmit handler on the form.
   */
  submitForm() {
    const event = document.createEvent('Event');
    event.initEvent('submit', true, true);

    ReactDOM.findDOMNode(this.refs.form).dispatchEvent(event);
  }

  render() {
    const classNames = "crystals-inline-component crystals-inline-dropdown";

    return (
      <div
        className={appendClasses(this.props.className, classNames)}
        data-component-state={this.props.loading ? 'loading' : 'reading'}
      >
        <div data-element-type="readonly">
          {this.optionLabelByValue(this.props.value)}
        </div>
        <Form
          inline
          ref="form"
          data-element-type="editable"
          action="javascript:void(0);"
          onSubmit={this.props.onSubmit}
        >
          <FormGroup>
            <FormControl
              componentClass="select"
              name={this.props.attribute}
              disabled={this.props.loading}
              value={this.props.value}
              onChange={this.submitForm}
            >
              {this.props.options.map(o => <option key={o[1]} value={o[1]}>{o[0]}</option>)}
            </FormControl>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

InlineDropdown.propTypes = {
  object: React.PropTypes.object.isRequired,
  attribute: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  loading: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
};

InlineDropdown.defaultProps = {
  object: {}
};

export default InlineDropdown;
