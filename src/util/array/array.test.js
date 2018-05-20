import array from './';

describe('array', () => {
  describe('equals', () => {
    describe('non array', () => {
      it('throws', () => {
        expect(array.equals.bind(null, 1, 2)).toThrow();
      });
    });

    describe('unequal arrays', () => {
      it('returns false', () => {
        expect(array.equals([1, 2, 3], [1, 3, 2])).toBeFalsy();
      });
    });

    describe('equal arrays', () => {
      it('returns true', () => {
        expect(array.equals([1, [2, 3]], [1, [2, 3]])).toBeTruthy();
      });
    });
  });
});
