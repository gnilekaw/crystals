import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { default as ArtworkPriceVisibilityQuickEdit } from '../src/artwork_price_visibility_quick_edit';

describe('ArtworkPriceVisibilityQuickEdit', () => {
  let el, instance;

  beforeEach(() => {
    el = $('<div></div>').get(0);
    sinon.stub($, 'ajax');
  });

  afterEach(() => {
    $.ajax.restore();
  })

  describe('#render', () => {
    let $root;

    beforeEach(() => {
      const props = {
        artwork: {display_price_range: false, price_hidden: true},
        saveUrl: '/api/artworks/mona-lisa',
        options: [
          ["Display exact price on Artsy", "exact"],
          ["Display price range on Artsy", "range"],
          ["Display \"Contact for price\" on Artsy", "hidden"]
        ]
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkPriceVisibilityQuickEdit, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
    });

    it('renders crystals-artwork-price-visibility class name', () => {
      $root.hasClass('crystals-artwork-price-visibility').should.be.true();
    });

    it('renders the form with proper fields', () => {
      $root.find('form select[name="display_price"]').val().should.equal('hidden');
    });
  });

  describe('updating artwork price visibility', () => {
    let dfd, $root;

    beforeEach(() => {
      dfd = $.Deferred();
      $.ajax.returns(dfd);
      const props = {
        artwork: {display_price_range: false, price_hidden: true},
        saveUrl: '/api/artworks/mona-lisa',
        options: [
          ["Display exact price on Artsy", "exact"],
          ["Display price range on Artsy", "range"],
          ["Display \"Contact for price\" on Artsy", "hidden"]
        ]
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkPriceVisibilityQuickEdit, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
      const $select = $root.find('select[name="display_price"]')
      $select.val('range');
      ReactTestUtils.Simulate.change($select.get(0));
    });

    describe('success', () => {
      it('makes proper requests to update artwork after submit', () => {
        $.ajax.should.be.calledOnce();
        $.ajax.firstCall.should.be.calledWith({
          url: '/api/artworks/mona-lisa',
          type: 'PUT',
          data: {ignore_blank: true, artwork: {display_price: "range"}},
          dataType: 'json'
        })
      });

      it('renders the UI with updated data after submit', () => {
        dfd.resolve({display_price_range: true, price_hidden: false});
        $root.find('[data-element-type="readonly"]').text().should.equal('Display price range on Artsy');
        $root.find('select[name="display_price"]').val().should.equal('range');
      });
    });

    xdescribe('error', () => {
    });
  });
});
