import {Grasp} from '../../../lib/grasp';

import {ERRORS} from '../../../lib/util/errors';

const {InputValidationError} = ERRORS;

describe('lib/grasp: ', () => {
  describe('Grasp(): ', () => {
    it('has metadata field.', () => {
      const grasp = Grasp({});

      expect(grasp).toHaveProperty('metadata');
      expect(grasp).toHaveProperty('execute');
      expect(grasp.metadata).toHaveProperty('kind');
      expect(typeof grasp.execute).toBe('function');
    });

    describe('execute(): ', () => {
      it('empty input', async () => {
        const grasp = Grasp({});
        const inputs = [{}];

        expect.assertions(1);

        try {
          await grasp.execute(inputs, {});
        } catch (error) {
          expect(error).toBeInstanceOf(InputValidationError);
        }
      });
    });
  });
});
