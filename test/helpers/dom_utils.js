import $ from 'jquery';
import {
  serializeFormDataToObject,
  appendClasses
} from '../../src/helpers/dom_utils';

describe('dom utils', () => {
  describe('#serializeFormDataToObject', () => {
    it('serializes form data to an object', () => {
      const $form = $(`
        <form>
          <input type="text" name="firstname" value="Mickey">
          <input type="text" name="lastname" value="Mouse">
          <input type="radio" name="gender" value="male" checked>
          <input type="radio" name="gender" value="female">
          <input type="radio" name="gender" value="other">
          <input type="checkbox" name="vehicle1" value="Bike" checked>
          <input type="checkbox" name="vehicle2" value="Car" checked>
        </form>
      `)
      serializeFormDataToObject($form).should.eql({
        firstname: 'Mickey',
        lastname: 'Mouse',
        gender: 'male',
        vehicle1: 'Bike',
        vehicle2: 'Car'
      });
    })
  });

  describe('#appendClasses', () => {
    it('appends single class to the existing classes', () => {
      appendClasses('new-class', 'old-class even-older-class').should.equal(
        'old-class even-older-class new-class');
    });

    it('appends multiple classes to the existing classes', () => {
      appendClasses('new-class newer-classes', 'old-class even-older-class').should.equal(
        'old-class even-older-class new-class newer-classes');
    });
  });
});
