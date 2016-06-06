import _ from 'underscore';

/*
 * Naive approach to support translation string interpolation so we can do
 *   t(translationObject, "artworks.visibility.hint", {title: "Mona Lisa"});
 */
function t(translation = {}, key = '', data) {
  const t = key.split('.').reduce((o, k, i, a) => {
    return o[k] || (i == a.length - 1 ? k : {});
  }, translation);

  if (_.isObject(data)) {
    _.templateSettings = { interpolate: /\%\{(.+?)\}/g };
    return _.template(t)(data);
  }
  return t;
}

export { t };
