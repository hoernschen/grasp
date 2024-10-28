import { Coffee } from '../../../../lib/comparison/coffee';

import { ERRORS } from '@grnsft/if-core/utils';

const { InputValidationError } = ERRORS;

describe('lib/comparison/coffee: ', () => {
  describe('Coffee(): ', () => {
    it('has metadata field.', () => {
      const plugin = Coffee({}, {}, {});

      expect(plugin).toHaveProperty('metadata');
      expect(plugin).toHaveProperty('execute');
      expect(typeof plugin.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const plugin = Coffee({}, {}, {});
        const inputs = [{}];

        expect.assertions(1);

        try {
          await plugin.execute(inputs);
        } catch (error) {
          expect(error).toBeInstanceOf(InputValidationError);
        }
      });
    });
  });
});
