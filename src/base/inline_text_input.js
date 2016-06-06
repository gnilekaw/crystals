import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import { t } from '../helpers/translation';
import { appendClasses } from '../helpers/dom_utils';

class InlineTextInput extends React.Component {
  render() {
    const classNames = "crystals-inline-component crystals-inline-text-input";

    return (
      <div
        className={appendClasses(this.props.className, classNames)}
        data-component-state={this.props.loading ? 'loading' : 'reading'}
      >
        <div data-element-type="readonly">
          {this.props.object[this.props.attribute]}
        </div>
        <Form
          inline
          data-element-type="editable"
          action="javascript:void(0);"
          onSubmit={this.props.onSubmit}
        >
          <FormGroup>
            <input name="ignore_blank" value="true" type="hidden" />
            <FormControl
              type="text"
              name={this.props.attribute}
              disabled={this.props.loading}
              defaultValue={this.props.object[this.props.attribute]}
            />
          </FormGroup>
          <Button
            type="submit"
            disabled={this.props.loading}
            className={this.props.loading ? 'is-loading' : null}
          >
            {t(this.props.t, 'forms.save')}
          </Button>
        </Form>
      </div>
    );
  }
}

InlineTextInput.propTypes = {
  object: React.PropTypes.object.isRequired,
  attribute: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  loading: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  t: React.PropTypes.object
};

InlineTextInput.defaultProps = {
  object: {}
};

export default InlineTextInput;
