import { h, Component } from 'preact';
import './cursor.css';

export const DEFAULTS = {
  classes: {
    blink: 'console-cursor--blink',
    element: 'console-cursor',
    write: 'console-cursor--write'
  },
  intervalMs: 400
};

export default class Cursor extends Component {
  constructor() {
    super();
    this.state = {
      blink: false,
      blinkInterval: null
    };
  }

  blink(interval) {
    this.setState({
      blinkInterval: setInterval((() => {
        this.setState({
          blink: !this.state.blink
        })
      }).bind(this), interval)
    });
  }

  stopBlinking() {
    if (this.state.blinkInterval) {
      clearInterval(this.state.blinkInterval);
    }

    this.setState({
      blink: false,
      blinkInterval: null
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.char) {
      this.stopBlinking();
    } else if (this.state.blinkInterval === null) {
      this.blink(nextProps.intervalMs || DEFAULTS.intervalMs);
    }
  }

  componentDidMount() {
    this.blink(DEFAULTS.intervalMs);
  }

  componentWillUnmount() {
    this.stopBlinking();
  }

  render(props, state) {
    const classes = Object.assign({}, DEFAULTS.classes, props.classes );
    let classesString = classes.element;
    if (props.char) {
      classesString = `${classesString} ${classes.write}`;
    } else if (state.blink) {
      classesString = `${classesString} ${classes.blink}`;
    }

    return (
      <span class={ classesString }>{
      props.char
      }</span>
    );
  }
};
