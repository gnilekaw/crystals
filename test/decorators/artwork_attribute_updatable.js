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

  describe('#prepareData', () => {
    describe('artwork', () => {
      it('returns data wrapped in artwork', () => {
        const props = {
          artwork: {title: "Mona Lisa"},
          saveUrl: "/api/artworks/mona-lisa"
        };

        instance = ReactDOM.render(
          React.createElement(DecoratedComponent, props), el);

        instance.prepareData({
          title: "Mona Lisa II",
          year: "1503 - 1517"
        }).should.eql({
          ignore_blank: true,
          artwork: {
            title: "Mona Lisa II",
            year: "1503 - 1517"
          }
        });
      });
    });

    describe('edition set', () => {
      it('returns data wrapped in artwork', () => {
        const props = {
          artwork: {title: "Mona Lisa"},
          isEditionSet: true,
          saveUrl: "/api/artworks/mona-lisa"
        };

        instance = ReactDOM.render(
          React.createElement(DecoratedComponent, props), el);

        instance.prepareData({
          title: "Mona Lisa II",
          year: "1503 - 1517"
        }).should.eql({
          ignore_blank: true,
          edition_set: {
            title: "Mona Lisa II",
            year: "1503 - 1517"
          }
        });
      });
    });
  });

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

    it('sets the updating state on submit', () => {
      instance.state.state.should.equal("updating");
    });

    it('makes a proper request to update artwork attribute', () => {
      $.ajax.calledOnce.should.be.true();
      $.ajax.args[0][0].should.eql({
        url: "/api/artworks/mona-lisa",
        type: "PUT",
        data: {ignore_blank: true, artwork: {ignore_blank: "true", title: "Portrait of Mona Lisa"}},
        dataType: "json"
      });
    });

    context('with successful update', () => {
      it('updates the artwork after submit', () => {
        dfd.resolve({title: "Portrait of Mona Lisa"});
        instance.state.artwork.should.eql({title: "Portrait of Mona Lisa"});
      });

      it('sets the updated state after submit', () => {
        dfd.resolve();
        instance.state.state.should.equal("updated");
      });
    });

    context('with failed update', () => {
      const error = {error: "Not Authorized"};

      it('does not update the artwork after submit', () => {
        dfd.resolve(error);
        instance.state.artwork.should.eql({title: "Mona Lisa"});
      });

      it('sets the errored state after submit', () => {
        dfd.resolve(error);
        instance.state.state.should.equal("errored");
      });

      it('triggers an error event on the form', (done) => {
        $form.one('error.crystals', (event, data) => {
          data.should.eql(error);
          done();
        })
        dfd.resolve(error);
      });
    });
  });
});
