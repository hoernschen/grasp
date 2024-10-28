import { SCC } from '../../../../lib/impact/SCC';

import { ERRORS } from '@grnsft/if-core/utils';

const { InputValidationError } = ERRORS;

describe('lib/impact/scc: ', () => {
  describe('SCC(): ', () => {
    it('has metadata field.', () => {
      const plugin = SCC({}, {}, {});

      expect(plugin).toHaveProperty('metadata');
      expect(plugin).toHaveProperty('execute');
      expect(typeof plugin.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const plugin = SCC({}, {}, {});
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
