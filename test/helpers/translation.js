import $ from 'jquery';
import { t } from '../../src/helpers/translation';

describe('translation', () => {
  context('#t', () => {
    it('returns empty string without arguments', () => {
      t().should.equal('');
    });

    it('returns empty string without key string', () => {
      t({save: 'Save Changes'}).should.equal('');
    });

    it('returns the last part of key string without translation object', () => {
      t(undefined, 'forms.save').should.equal('save');
    });

    it('returns the last part of key string without matching translation object', () => {
      t({}, 'forms.save').should.equal('save');
    });

    it('translates properly without data', () => {
      const translation = {
        forms: {
          save: '儲存',
          cancel: '取消'
        }
      };

      t(translation, 'forms.save').should.equal('儲存');
    });

    it('translates properly with data', () => {
      const translation = {
        forms: {
          last_submitted_at: '上次送出於 %{date}',
        }
      };

      t(translation, 'forms.last_submitted_at', {date: '2016-06-03'})
        .should.equal('上次送出於 2016-06-03');
    });
  });
});
