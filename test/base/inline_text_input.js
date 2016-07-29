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

    it("renders value for readonly state by object's attribute by default", () => {
      const props = {object: {price: "3500"}, attribute: "price"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('[data-element-type="readonly"]').text().should.equal("3500");
    });

    it('renders value for readonly state by props', () => {
      const props = {object: {price: "3500"}, attribute: "price", display: "£3,500"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('[data-element-type="readonly"]').text().should.equal("£3,500");
    });

    it('renders the inited state by default', () => {
      const props = {object: {}, attribute: "whatever"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).attr('data-component-state').should.equal('inited');
    });

    it('renders the state by props', () => {
      const props = {object: {}, attribute: "whatever", state: 'inited'};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).attr('data-component-state').should.equal('inited');
    });

    it('renders the input with proper name and value', () => {
      const props = {object: {title: 'Artsy'}, attribute: "title"};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('form input[name="title"]').val().should.equal('Artsy');
    });

    it('renders the button with proper translation', () => {
      const props = {object: {}, attribute: "whatever", t: {actions: {save: '儲存'}}};
      const instance = ReactDOM.render(React.createElement(InlineTextInput, props), el);
      const root = ReactDOM.findDOMNode(instance);

      $(root).find('form button[type="submit"]').text().should.equal('儲存');
    });
  });
});
