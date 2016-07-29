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

  isUpdating() {
    return this.props.state == "updating";
  }

  render() {
    const classNames = "crystals-inline-component crystals-inline-text-input";

    return (
      <div
        className={appendClasses(this.props.className, classNames)}
        data-component-state={this.props.state || "inited"}
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
          <FormGroup
            className={this.props.state == "errored" ? "has-error" : null}
          >
            <FormControl
              type="text"
              name={this.props.attribute}
              disabled={this.isUpdating()}
              placeholder={this.props.placeholder}
              defaultValue={this.props.object[this.props.attribute]}
            />
            <Button
              type="submit"
              bsStyle="primary"
              disabled={this.isUpdating()}
              className={this.isUpdating() ? 'is-loading' : null}
            >
              {t(this.props.t, 'actions.save')}
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
  state: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  t: React.PropTypes.object
};

InlineTextInput.defaultProps = {
  object: {}
};

export default InlineTextInput;
