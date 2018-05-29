/* eslint-env node, jest */
import { h } from 'preact';
import render from 'preact-render-to-string';
import { shallow, deep } from 'preact-render-spy';

import Line from '../line';
import Console, { DEFAULTS } from './';

jest.useFakeTimers();

const componentToString = (component) =>
  component.toString().split('\n').slice(2).join('\n');

const MAX_CHAR_TIMEOUT = DEFAULTS.console.typing.char.avgMs
  + (DEFAULTS.console.typing.char.deviation * DEFAULTS.console.typing.char.avgMs);

const MAX_NEWLINE_TIMEOUT = DEFAULTS.console.typing.line.delay.avgMs
  + (DEFAULTS.console.typing.line.delay.deviation * DEFAULTS.console.typing.line.delay.avgMs);

describe('Console', () => {
  let tree;
  let component;

  describe('empty', () => {
    beforeEach(() => {
      component = deep(<Console />);
      component.rerender();
      tree = componentToString(component);
    });

    it('renders as expected', () => {
      expect(tree).toMatchSnapshot();
    });

    it('adds the default class to the element', () => {
      expect(tree).toMatch(new RegExp(`class="${DEFAULTS.console.classes.element}"`));
    });

    it('adds the cursor line', () => {
      expect(component.find('Line').length).toBe(1);
    });

    it('adds the ps1', () => {
      expect(component.find('PS1').length).toBe(1);
    });

    it('adds the cursor', () => {
      expect(component.find('Cursor').length).toBe(1);
    });
  });

  describe('writing', () => {
    describe('string', ()  => {
      let line;

      beforeEach(() => {
        line = 'test line.';
        component = deep(<Console lines={ `${line}` } />);
        component.rerender();
        tree = componentToString(component);
      });

      it('renders as expected', () => {
        expect(tree).toMatchSnapshot();
      });

      describe('cursor', () => {
        it('writes the first character', () => {
          expect(component.find('Cursor').attr('char')).toEqual('t');
        });
      });

      describe('line', () => {
        it('writes the first character', () => {
          expect(component.find('Line').attr('content')).toEqual('t');
        });
      });

      describe('after some time', () => {
        beforeEach(() => {
          jest.runTimersToTime(MAX_CHAR_TIMEOUT);
          component.rerender();
          tree = componentToString(component);
        });

        it('renders as expected', () => {
          expect(tree).toMatchSnapshot();
        });

        describe('cursor', () => {
          it('writes the second character', () => {
            expect(component.find('Cursor').attr('char')).toEqual('e');
          });
        });

        describe('line', () => {
          it('writes the first two characters', () => {
            expect(component.find('Line').attr('content')).toEqual('te');
          });
        });

        describe('after the whole line has been written', () => {
          beforeEach(() => {
            for(let i = 2; i < line.length; i++) {
              jest.runTimersToTime(MAX_CHAR_TIMEOUT);
              component.rerender();
            }

            tree = componentToString(component);
          });

          it('renders as expected', () => {
            expect(tree).toMatchSnapshot();
          });

          describe('cursor', () => {
            it('writes the last character', () => {
              expect(component.find('Cursor').attr('char')).toEqual('.');
            });
          });

          describe('line', () => {
            it('contains the whole line', () => {
              expect(component.find('Line').attr('content')).toEqual(line);
            });
          });
        });
      });
    });

    describe('array', () => {
      let lines;
      let props;
      let component;
      let line;
      let currentLine;

      beforeEach(() => {
        lines  = [
          'test line.',
          'another line'
        ];
        props = {
          lines
        };
        component = deep(<Console { ...props } />);
      });

      describe('first line', () => {
        beforeEach(() => {
          currentLine = component.state().console.currentLine;
          line = lines[currentLine];
          component.rerender();
          tree = componentToString(component);
        });

        it('renders as expected', () => {
          expect(tree).toMatchSnapshot();
        });

        describe('cursor', () => {
          it('writes the first character', () => {
            expect(component.find('Cursor').attr('char')).toEqual(line.slice(0, 1));
          });
        });

        describe('line', () => {
          it('writes the first character', () => {
            expect(component.find('Line').attr('content')).toEqual(line.slice(0, 1));
          });
        });

        describe('after some time', () => {
          beforeEach(() => {
            jest.runTimersToTime(MAX_CHAR_TIMEOUT);
            component.rerender();
            tree = componentToString(component);
          });

          it('renders as expected', () => {
            expect(tree).toMatchSnapshot();
          });

          describe('cursor', () => {
            it('writes the second character', () => {
              expect(component.find('Cursor').attr('char')).toEqual(line.slice(1, 2));
            });
          });

          describe('line', () => {
            it('writes the first two characters', () => {
              expect(component.find('Line').attr('content')).toEqual(line.slice(0, 2));
            });
          });

          describe('after the whole line has been written', () => {
            beforeEach(() => {
              for(let i = 2; i < line.length; i++) {
                jest.runTimersToTime(MAX_CHAR_TIMEOUT);
                component.rerender();
              }

              tree = componentToString(component);
            });

            it('renders as expected', () => {
              expect(tree).toMatchSnapshot();
            });

            describe('cursor', () => {
              it('writes the last character', () => {
                expect(component.find('Cursor').attr('char')).toEqual(line.slice(-1));
              });
            });

            describe('line', () => {
              it('contains the whole line', () => {
                expect(component.find('Line').attr('content')).toEqual(line);
              });
            });

          describe('second line', () => {
            beforeEach(() => {
              jest.clearAllTimers();
              //jest.runTimersToTime(MAX_NEWLINE_TIMEOUT + MAX_CHAR_TIMEOUT + 200);
              //jest.runOnlyPendingTimers();
              currentLine = component.state().console.currentLine;
              line = lines[currentLine];
              console.log(lines);
              console.log(line);
              component.rerender();
              console.log(JSON.stringify(component.state(), null, 2));
              tree = componentToString(component);
            });

            it('increments the current line', () => {
              expect(currentLine).toBe(1);
            })

            it('renders as expected', () => {
              expect(tree).toMatchSnapshot();
            });

            describe('cursor', () => {
              it('writes the first character', () => {
                expect(component.find('Cursor').attr('char')).toEqual(line.slice(0, 1));
              });
            });

            describe('line', () => {
              it('writes the first character', () => {
                expect(component.find('Line').attr('content')).toEqual(line.slice(0, 1));
              });
            });

            describe('after some time', () => {
              beforeEach(() => {
                jest.runTimersToTime(MAX_CHAR_TIMEOUT);
                component.rerender();
                tree = componentToString(component);
              });

              it('renders as expected', () => {
                expect(tree).toMatchSnapshot();
              });

              describe('cursor', () => {
                it('writes the second character', () => {
                  expect(component.find('Cursor').attr('char')).toEqual(line.slice(1, 2));
                });
              });

              describe('line', () => {
                it('writes the first two characters', () => {
                  expect(component.find('Line').attr('content')).toEqual(line.slice(0, 2));
                });
              });

              describe('after the whole line has been written', () => {
                beforeEach(() => {
                  for(let i = 2; i < line.length; i++) {
                    jest.runTimersToTime(MAX_CHAR_TIMEOUT);
                    component.rerender();
                  }

                  tree = componentToString(component);
                });

                it('renders as expected', () => {
                  expect(tree).toMatchSnapshot();
                });

                describe('cursor', () => {
                  it('writes the last character', () => {
                    expect(component.find('Cursor').attr('char')).toEqual(line.slice(-1));
                  });
                });

                describe('line', () => {
                  it('contains the whole line', () => {
                    expect(component.find('Line').attr('content')).toEqual(line);
                  });
                });
              });
            });
          });

          });

        });
      });
    });
  });
});
