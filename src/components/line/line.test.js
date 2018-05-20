import { h } from 'preact';
import render from 'preact-render-to-string';
import Line, { DEFAULTS } from './';

describe('Line', () => {
  describe('empty', () => {
    let tree;

    beforeEach(() => {
      tree = render(<Line />);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the default element class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}"`));
    });
  });

  describe('ps1', () => {
    let tree;

    beforeEach(() => {
      tree = render(<Line ps1={ {
        content: 'test'
      }} />);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('sets the content of ps1 correctly', () => {
      expect(tree).toMatch(/>test</);
    });

    it('adds the default element class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}"`));
    });
  });

  describe('content', () => {
    let tree;

    beforeEach(() => {
      tree = render(<Line content="foo bar" />);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('sets the content correctly', () => {
      expect(tree).toMatch(/>foo bar</);
    });

    it('adds the default element class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}"`));
    });
  });

  describe('class', () => {
    let tree;

    describe('element', () => {
      beforeEach(() => {
        tree = render(<Line classes={{
          element: 'testclass'
        }} />);
      });

      it('renders as expected', () => {
        expect(tree).toMatchSnapshot();
      });

      it('sets the class correctly', () => {
        expect(tree).toMatch(/class="testclass"/);
      });
    });

    describe('content', () => {
      beforeEach(() => {
        tree = render(<Line classes={{
          content: 'testcontent'
        }} />);
      });

      it('renders as expected', () => {
        expect(tree).toMatchSnapshot();
      });

      it('sets the class correctly', () => {
        expect(tree).toMatch(/class="testcontent"/);
      });
    });
  });

  describe('write', () => {
    let tree;

    beforeEach(() => {
      tree = render(<Line write={ true } cursor={{
        char: 't'
      }}/>);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('sets the char under the cursor correctly', () => {
      expect(tree).toMatch(/>t</);
    });

    it('adds the default element class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}"`));
    });
  });
});
