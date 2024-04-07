import { Displacement } from '../../../../lib/impact/displacement';

import { ERRORS } from '../../../../lib/util/errors';

const { InputValidationError } = ERRORS;

describe('lib/impact/displacement: ', () => {
  describe('Displacement(): ', () => {
    it('has metadata field.', () => {
      const plugin = Displacement({});

      expect(plugin).toHaveProperty('metadata');
      expect(plugin).toHaveProperty('execute');
      expect(plugin.metadata).toHaveProperty('kind');
      expect(typeof plugin.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const plugin = Displacement({});
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
