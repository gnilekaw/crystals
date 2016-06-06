import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { default as ArtworkAttributeUpdatable } from '../../src/decorators/artwork_attribute_updatable';

class MyComponent extends React.Component {
  render() {
    return <div/>;
  }
}
const DecoratedComponent = ArtworkAttributeUpdatable(MyComponent);

describe('ArtworkAttributeUpdatable', () => {
  let el, instance;

  beforeEach(() => {
    el = $('<div></div>').get(0);
    sinon.stub($, 'ajax');
  });

  afterEach(() => {
    $.ajax.restore();
  });

  describe('validation', () => {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    it('raises a warning when missing artwork in the props', () => {
      const props = {saveUrl: "/api/artworks/mona-lisa"};

      instance = ReactDOM.render(
        React.createElement(DecoratedComponent, props), el);

      console.error.should.be.calledOnce();
      console.error.should.be.calledWithExactly(
        "Warning: Failed propType: Required prop `artwork` was not " +
        "specified in `ArtworkAttributeUpdatableComponent`."
      );
    });

    it('raises a warning when missing saveUrl in the props', () => {
      const props = {artwork: {title: "mona-lisa"}};

      instance = ReactDOM.render(
        React.createElement(DecoratedComponent, props), el);

      console.error.should.be.calledOnce();
      console.error.should.be.calledWithExactly(
        "Warning: Failed propType: Required prop `saveUrl` was not " +
        "specified in `ArtworkAttributeUpdatableComponent`."
      );
    });
  })

  describe('#onSubmit', () => {
    let dfd, $form;

    beforeEach(() => {
      const props = {
        artwork: {title: "Mona Lisa"},
        saveUrl: "/api/artworks/mona-lisa"
      };

      instance = ReactDOM.render(
        React.createElement(DecoratedComponent, props), el);

      dfd = $.Deferred();
      $.ajax.returns(dfd);
      $form = $(`
        <form>
          <input name="ignore_blank" value="true" />
          <input name="title" value="Portrait of Mona Lisa" />
        </form>
      `);
      $form.on('submit', instance.onSubmit).trigger('submit');
    });

    it('sets the loading state on submit', () => {
      instance.state.loading.should.be.true()
    });

    it('unsets the loading state after submit', () => {
      dfd.resolve();
      instance.state.loading.should.be.false()
    });

    it('makes a proper request to update artwork attribute', () => {
      $.ajax.calledOnce.should.be.true();
      $.ajax.args[0][0].should.eql({
        url: "/api/artworks/mona-lisa",
        type: "PATCH",
        data: {artwork: {ignore_blank: "true", title: "Portrait of Mona Lisa"}},
        dataType: "json"
      });
    });

    it('updates the artwork after submit', () => {
      dfd.resolve({title: "Portrait of Mona Lisa"});
      instance.state.artwork.should.eql({title: "Portrait of Mona Lisa"});
    });
  });
});
