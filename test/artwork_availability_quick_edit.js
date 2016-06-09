import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { default as ArtworkAvailabilityQuickEdit } from '../src/artwork_availability_quick_edit';

describe('ArtworkAvailabilityQuickEdit', () => {
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
        artwork: {availability: "for sale"},
        saveUrl: '/api/artworks/mona-lisa',
        options: [
          ["For Sale", "for sale"],
          ["Not For Sale", "not for sale"],
          ["Sold", "sold"],
          ["On Hold", "on hold"]
        ]
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkAvailabilityQuickEdit, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
    });

    it('renders crystals-artwork-availability class name', () => {
      $root.hasClass('crystals-artwork-availability').should.be.true();
    });

    it('renders the form with proper fields', () => {
      $root.find('form input[name="ignore_blank"]').val().should.equal('true');
      $root.find('form select[name="availability"]').val().should.equal('for sale');
    });
  });

  describe('updating artwork availability', () => {
    let dfd, $root;

    beforeEach(() => {
      dfd = $.Deferred();
      $.ajax.returns(dfd);
      const props = {
        artwork: {availability: "for sale"},
        saveUrl: '/api/artworks/mona-lisa',
        options: [
          ["For Sale", "for sale"],
          ["Not For Sale", "not for sale"],
          ["Sold", "sold"],
          ["On Hold", "on hold"]
        ]
      };
      instance = ReactDOM.render(
        React.createElement(ArtworkAvailabilityQuickEdit, props), el);
      $root = $(ReactDOM.findDOMNode(instance));
      const $select = $root.find('select[name="availability"]')
      $select.val('not for sale');
      ReactTestUtils.Simulate.change($select.get(0));
    });

    describe('success', () => {
      it('makes proper requests to update artwork after submit', () => {
        $.ajax.should.be.calledOnce();
        $.ajax.firstCall.should.be.calledWith({
          url: '/api/artworks/mona-lisa',
          type: 'PATCH',
          data: {artwork: {ignore_blank: "true", availability: "not for sale"}},
          dataType: 'json'
        })
      });

      it('renders the UI with updated data after submit', () => {
        dfd.resolve({availability: 'not for sale'});
        $root.find('[data-element-type="readonly"]').text().should.equal('Not For Sale');
        $root.find('select[name="availability"]').val().should.equal('not for sale');
      });
    });

    xdescribe('error', () => {
    });
  });
});
