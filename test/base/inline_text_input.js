import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { default as InlineTextInput } from '../../src/base/inline_text_input';

describe('InlineTextInput', () => {
  let el;

  beforeEach(() => {
    el = $('<div></div>').get(0);
  });

  describe('#render', () => {
    it('renders default class names', () => {
      const props = {object: {}, attribute: "whatever"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      ["crystals-inline-component", "crystals-inline-text-input"].forEach((className) => {
        $(root).hasClass(className).should.be.true();
      });
    });

    it('renders class names added by props', () => {
      const myClasses = "my-class1 my-class2";
      const props = {object: {}, attribute: "whatever", className: myClasses };
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      ["crystals-inline-component", "crystals-inline-text-input"]
        .concat(myClasses.split(' ')).forEach((className) => {
          $(root).hasClass(className).should.be.true();
      });
    });

    it('renders the reading state by default', () => {
      const props = {object: {}, attribute: "whatever"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).attr('data-component-state').should.equal('reading');
    });

    it('renders the loading state by props', () => {
      const props = {object: {}, attribute: "whatever", loading: true};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).attr('data-component-state').should.equal('loading');
    });

    it('renders the input with proper name and value', () => {
      const props = {object: {title: 'Artsy'}, attribute: "title"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('form input[name="title"]').val().should.equal('Artsy');
    });

    it('renders the button with proper translation', () => {
      const props = {object: {}, attribute: "whatever", t: {forms: {save: '儲存'}}};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('form button[type="submit"]').text().should.equal('儲存');
    });
  });
});
