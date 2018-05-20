import { DEFAULTS as PS1_DEFAULTS } from '../ps1';
import { DEFAULTS as LINE_DEFAULTS } from '../line';
import { DEFAULTS as CURSOR_DEFAULTS } from '../cursor';

export default {
  console: {
    append: false,
    classes: {
      element: 'console',
      line: 'console-line',
      lineWrite: 'console-line--write'
    },
    typing: {
      char: {
        avgMs: 150,
        deviation: 0.3,
        minMs: 50,
        maxMs: Infinity
      },
      line: {
        delay: {
          avgMs: 1000,
          deviation: 0.5,
          minMs: 500,
          maxMs: 1500
        }
      }
    }
  },
  line: LINE_DEFAULTS,
  ps1: PS1_DEFAULTS,
  cursor: CURSOR_DEFAULTS
}
