import { Chocolate } from '../../../../lib/comparison/chocolate';

import { ERRORS } from '../../../../lib/util/errors';

const { InputValidationError } = ERRORS;

describe('lib/comparison/chocolate: ', () => {
  describe('Chocolate(): ', () => {
    it('has metadata field.', () => {
      const plugin = Chocolate({});

      expect(plugin).toHaveProperty('metadata');
      expect(plugin).toHaveProperty('execute');
      expect(plugin.metadata).toHaveProperty('kind');
      expect(typeof plugin.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const plugin = Chocolate({});
        const inputs = [{}];

        expect.assertions(1);

        try {
          await plugin.execute(inputs, {});
        } catch (error) {
          expect(error).toBeInstanceOf(InputValidationError);
        }
      });
    });
  });
});
