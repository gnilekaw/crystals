import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { default as ArtworkPrice } from '../src/artwork_price_quick_edit';

describe('ArtworkPriceQuickEdit', () => {
  let el, instance;

  beforeEach(() => {
    el = $('<div></div>').get(0);
    sinon.stub($, 'ajax');
  });

  afterEach(() => {
    $.ajax.restore();
  })

  describe('validation', () => {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    it('raises a warning when missing artwork in the props', () => {
      const props = {
        saveUrl: 'api/artworks/mona-lisa'
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkPrice, props), el);

      console.error.should.be.called();
      console.error.should.be.calledWithExactly(
        "Warning: Failed propType: Required prop `artwork` was not " +
        "specified in `ArtworkAttributeUpdatableComponent`."
      );
    });

    it('raises a warning when missing saveUrl in the props', () => {
      const props = {
        artwork: {price_listed: 100}
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkPrice, props), el);

      console.error.should.be.called();
      console.error.should.be.calledWithExactly(
        "Warning: Failed propType: Required prop `saveUrl` was not " +
        "specified in `ArtworkAttributeUpdatableComponent`."
      );
    });
  });

  describe('#render', () => {
    let $root;

    beforeEach(() => {
      const props = {
        artwork: {price_listed: 100},
        saveUrl: '/api/artworks/mona-lisa'
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkPrice, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
    });

    it('renders crystals-artwork-price class name', () => {
      $root.hasClass('crystals-artwork-price').should.be.true();
    });

    it('renders the form with proper fields', () => {
      $root.find('form input[name="ignore_blank"]').val().should.equal('true');
      $root.find('form input[name="price_listed"]').val().should.equal('100');
    });
  });

  describe('updating artwork price', () => {
    let dfd, $root;

    beforeEach(() => {
      dfd = $.Deferred();
      $.ajax.returns(dfd);
      const props = {
        artwork: {price_listed: 100},
        saveUrl: "/api/artworks/mona-lisa"
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkPrice, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
      $root.find('input[name="price_listed"]').val(199);
      $root.find('button[type="submit"]').click();
    });

    describe('success', () => {
      it('makes proper requests to update artwork after submit', () => {
        $.ajax.should.be.calledOnce();
        $.ajax.firstCall.should.be.calledWith({
          url: '/api/artworks/mona-lisa',
          type: 'PATCH',
          data: {artwork: {ignore_blank: "true", price_listed: "199"}},
          dataType: 'json'
        })
      });

      it('renders the UI with updated data after submit', () => {
        dfd.resolve({price_listed: 199});
        $root.find('[data-element-type="readonly"]').text().should.equal('199');
        $root.find('input[name="price_listed"]').val().should.equal('199');
      });

      xit('renders the UI with different data from server after submit', () => {
        dfd.resolve({price_listed: 200});
        $root.find('[data-element-type="readonly"]').text().should.equal('200');
        $root.find('input[name="price_listed"]').val().should.equal('200');
      });
    });

    xdescribe('error', () => {
    });
  });
});
