/* eslint-env node, jest */

import { h } from 'preact';
import render from 'preact-render-to-string';
import { DEFAULTS } from './';
import PS1 from './';

describe('PS1', () => {
  describe('empty', () => {
    let tree;

    beforeEach(() => {
      tree = render(<PS1 />);
    });

    it ('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the default class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}"`));
    });

    it('adds the default content', () => {
      expect(tree).toMatch(new RegExp(`>\\${DEFAULTS.content}<`));
    });
  });

  describe('content', () => {
    let tree;
    
    beforeEach(() => {
      tree = render(<PS1 content="$" />);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the default class', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.classes.element}"`));
    });

    it('adds the content', () => {
      expect(tree).toMatch(/\$/);
    })
  });

  describe('class', () => {
    let tree;

    beforeEach(() => {
      tree = render(<PS1 classes={{
        element: "testclass"
      }} />);
    });
    
    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the class property', () => {
      expect(tree).toMatch(/class="testclass"/);
    });

    it('adds the default content', () => {
      expect(tree).toMatch(new RegExp(`>\\${DEFAULTS.content}<`));
    });
  });
});
