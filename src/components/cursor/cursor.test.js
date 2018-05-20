import { h } from 'preact';
import render from 'preact-render-to-string';
import { shallow } from 'preact-render-spy';
import Cursor, { DEFAULTS } from './';

jest.useFakeTimers();

describe('Cursor', () => {
  describe('empty', () => {
    let tree;

    beforeEach(() => {
      tree = render(<Cursor />);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the default element class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}`));
    });

    it('does not add the default blink class', () => {
      expect(tree).not.toMatch(new RegExp(`${DEFAULTS.classes.blink}"`));
    });

    it('does not add the default write class', () => {
      expect(tree).not.toMatch(new RegExp(DEFAULTS.classes.write));
    });
  });

  describe('char', () => {
    let tree;

    beforeEach(() => {
      tree = render(<Cursor char="t"/>);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the default element class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}`));
    });

    it('adds the default write class', () => {
      expect(tree).toMatch(new RegExp(`${DEFAULTS.classes.write}"`));
    });

    it('does not add the default blink class', () => {
      expect(tree).not.toMatch(new RegExp(`${DEFAULTS.classes.blink}"`));
    });

    it('writes the char', () => {
      expect(tree).toMatch(/>t</);
    });
  });

  describe('classes', () => {
    describe('element', () => {
      let tree;

      beforeEach(() => {
        tree = render(<Cursor classes={{
          element: 'test-element'
        }} />);
      });

      it('renders as expected', () => {
        expect(tree).toMatchSnapshot();
      });

      it('adds the given class to the element', () => {
        expect(tree).toMatch(/class="test-element/);
      });
    });

    describe('blink', () => {
      let tree;
      let component;

      beforeEach(() => {
        tree = render(<Cursor classes={{
          blink: 'test-element--blink'
        }} />);
      });

      it('renders as expected', () => {
        expect(tree).toMatchSnapshot();
      });

      it('adds the default class to the element', () => {
        expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}`));
      });

      it('does not add the blink class, yet', () => {
        expect(tree).not.toMatch(new RegExp(`class="${DEFAULTS.classes.element} ${DEFAULTS.classes.blink}"`));
      });

      describe('after the default interval has passed', () => {
        beforeEach(() => {
          component = shallow(<Cursor classes={{
            blink: 'test-element--blink'
          }} />);
          jest.runTimersToTime(DEFAULTS.interval + 1);
          component.rerender();
          tree = component.toString();
        });

        it('adds the given blink class', () => {
          expect(tree).toMatch(/test-element--blink"/);
        });
      });
    });

    describe('write', () => {
      let tree;

      beforeEach(() => {
        tree = render(<Cursor char="t" classes={{
          write: 'test-element--write'
        }} />);
      });

      it('renders as expected', () => {
        expect(tree).toMatchSnapshot();
      });

      it('adds the default class to the element', () => {
        expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}`));
      });

      it('adds the given write class', () => {
        expect(tree).toMatch(/test-element--write"/);
      });
    });
  });
});
