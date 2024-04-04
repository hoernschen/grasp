import {Bananas} from '../../../../lib/comparison/bananas';

import {ERRORS} from '../../../../lib/util/errors';

const {InputValidationError} = ERRORS;

describe('lib/comparison/bananas: ', () => {
  describe('Bananas(): ', () => {
    it('has metadata field.', () => {
      const bananas = Bananas({});

      expect(bananas).toHaveProperty('metadata');
      expect(bananas).toHaveProperty('execute');
      expect(bananas.metadata).toHaveProperty('kind');
      expect(typeof bananas.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const bananas = Bananas({});
        const inputs = [{}];

        expect.assertions(1);

        try {
          await bananas.execute(inputs, {});
        } catch (error) {
          expect(error).toBeInstanceOf(InputValidationError);
        }
      });
    });
  });
});
