import math from './';

describe('math', () => {
  describe('randSign', () => {
    it('returns either 1 or minus one', () => {
      expect(`${math.randSign()}`).toMatch(/-?1/);
    });
  });

  describe('randInt', () => {
    let result;
    describe('type', () => {
      beforeEach(() => {
        result = math.randInt(-10, 10);
      });

      it('returns a number', () => {
        expect(typeof result).toEqual('number');
      });
    });

    describe('bounds', () => {
      beforeEach(() => {
        result = math.randInt(5, 7);
      });

      it('returns an integer greater than or equal to 5', () => {
        expect(result).toBeGreaterThanOrEqual(5);
      });

      it('returns an integer less than 7', () => {
        expect(result).toBeLessThan(7);
      })
    });
  });
});
