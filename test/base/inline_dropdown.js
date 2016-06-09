import $ from 'jquery';
import _ from 'underscore';
import should from 'should';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { default as InlineDropdown } from '../../src/base/inline_dropdown';

describe('InlineDropdown', () => {
  let el;

  beforeEach(() => {
    el = $('<div></div>').get(0);
  });

  describe('#render', () => {
    it('renders default class names', () => {
      const props = {object: {}, attribute: "whatever", options: []};
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);

      ["crystals-inline-component", "crystals-inline-dropdown"].forEach((className) => {
        $(root).hasClass(className).should.be.true();
      });
    });

    it('renders class names added by props', () => {
      const myClasses = "my-class1 my-class2";
      const props = {object: {}, attribute: "whatever", options: [], className: myClasses };
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);

      ["crystals-inline-component", "crystals-inline-dropdown"]
        .concat(myClasses.split(' ')).forEach((className) => {
          $(root).hasClass(className).should.be.true();
      });
    });

    it('renders the reading state by default', () => {
      const props = {object: {}, attribute: "whatever", options: []};
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).attr('data-component-state').should.equal('reading');
    });

    it('renders the loading state by props', () => {
      const props = {object: {}, attribute: "whatever", options: [], loading: true};
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).attr('data-component-state').should.equal('loading');
    });

    it('renders the dropdown with proper options', () => {
      const props = {
        object: {title: "artsy_cms"},
        attribute: "title",
        value: "artsy_cms",
        options: [
          ["Artsy Folio", "artsy_folio"],
          ["Artsy CMS", "artsy_cms"],
          ["Artsy App", "artsy_app"]
        ]
      };
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);

      _.map($(root).find('form select[name="title"] option'), (o) => $(o).text())
        .should.eql(["Artsy Folio", "Artsy CMS", "Artsy App"]);
      _.map($(root).find('form select[name="title"] option'), (o) => $(o).val())
        .should.eql(["artsy_folio", "artsy_cms", "artsy_app"]);
    });

    it('renders the dropdown with correctly selected option', () => {
      const props = {
        object: {title: "artsy_cms"},
        attribute: "title",
        value: "artsy_cms",
        options: [
          ["Artsy Folio", "artsy_folio"],
          ["Artsy CMS", "artsy_cms"],
          ["Artsy App", "artsy_app"]
        ]
      };
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);
    });

    it('includes a hidden ignore_blank input', () => {
      const props = {object: {}, attribute: "whatever", options: []};
      const instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('form input[name="ignore_blank"]').val().should.equal('true');
    });
  });

  describe('#optionLabelByValue', () => {
    let instance;

    beforeEach(() => {
      const options = [
        ["Artsy Folio", "artsy_folio"],
        ["Artsy CMS", "artsy_cms"],
        ["Artsy App", "artsy_app"]
      ];
      const props = {object: {}, attribute: "whatever", options: options};
      instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
    });

    it('returns labels by value', () => {
      instance.optionLabelByValue("artsy_app").should.equal("Artsy App");
    });

    it('returns undefined for invalid value', () => {
      should(instance.optionLabelByValue("artsy_washing_machine")).be.undefined();
    });
  });

  describe('#submitForm', () => {
    let instance, $root;

    beforeEach(() => {
      const props = {
        object: {title: "artsy_cms"},
        attribute: "title",
        value: "artsy_cms",
        options: [
          ["Artsy Folio", "artsy_folio"],
          ["Artsy CMS", "artsy_cms"],
          ["Artsy App", "artsy_app"]
        ],
        onSubmit: sinon.stub()
      };
      instance = ReactDOM.render(React.createElement(InlineDropdown, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
    });

    it('calls props.onSubmit after calling submitForm', () => {
      instance.props.onSubmit.should.not.be.called();
      // TODO: This will give us the synthetic event warning.
      instance.submitForm();
      instance.props.onSubmit.should.be.calledOnce();
    });

    it('calls props.onSubmit after option change event', () => {
      const select = $root.find('select').get(0);

      instance.props.onSubmit.should.not.be.called();
      ReactTestUtils.Simulate.change(select);
      instance.props.onSubmit.should.be.calledOnce();
    });

    it('calls props.onSubmit after option change event (via dispatchEvent)', () => {
      const select = $root.find('select').get(0);
      const event = new Event('change', {bubbles: true, cancelable: false});

      instance.props.onSubmit.should.not.be.called();
      // TODO: dispatchEvent won't work with detached element here so we have
      // to append it to the document DOM tree.
      $('body').append(el);
      select.dispatchEvent(event);
      instance.props.onSubmit.should.be.calledOnce();
    });
  });
});
