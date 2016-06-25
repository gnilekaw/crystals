import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import { t } from '../helpers/translation';
import { appendClasses } from '../helpers/dom_utils';

class InlineTextInput extends React.Component {
  display() {
    return this.props.display ?
      this.props.display : this.props.object[this.props.attribute];
  }

  render() {
    const classNames = "crystals-inline-component crystals-inline-text-input";

    return (
      <div
        className={appendClasses(this.props.className, classNames)}
        data-component-state={this.props.loading ? 'loading' : 'reading'}
      >
        <div data-element-type="readonly">
          {this.display()}
        </div>
        <Form
          inline
          data-element-type="editable"
          action="javascript:void(0);"
          onSubmit={this.props.onSubmit}
        >
          <FormGroup>
            <FormControl
              type="text"
              name={this.props.attribute}
              disabled={this.props.loading}
              placeholder={this.props.placeholder}
              defaultValue={this.props.object[this.props.attribute]}
            />
            <Button
              type="submit"
              disabled={this.props.loading}
              className={this.props.loading ? 'is-loading' : null}
            >
              {t(this.props.t, 'forms.save')}
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

InlineTextInput.propTypes = {
  object: React.PropTypes.object.isRequired,
  attribute: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  display: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  loading: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  t: React.PropTypes.object
};

InlineTextInput.defaultProps = {
  object: {}
};

export default InlineTextInput;
