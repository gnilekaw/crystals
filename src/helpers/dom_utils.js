import $ from 'jquery';
import _ from 'underscore';

function serializeFormDataToObject($form) {
    var o = {};
    var a = $form.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

function appendClasses(newClasses, oldClasses) {
  if (!oldClasses) { oldClasses = ''; }
  if (!newClasses) { newClasses = ''; }
  return _.compact([oldClasses.trim(), newClasses.trim()]).join(' ');
}

export {
  serializeFormDataToObject,
  appendClasses
};
