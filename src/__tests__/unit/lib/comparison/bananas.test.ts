import { Bananas } from '../../../../lib/comparison/bananas';

import { ERRORS } from '@grnsft/if-core/utils';

const { InputValidationError } = ERRORS;

describe('lib/comparison/bananas: ', () => {
  describe('Bananas(): ', () => {
    it('has metadata field.', () => {
      const plugin = Bananas({}, {}, {});

      expect(plugin).toHaveProperty('metadata');
      expect(plugin).toHaveProperty('execute');
      expect(typeof plugin.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const plugin = Bananas({}, {}, {});
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
