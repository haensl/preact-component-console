import { h } from 'preact';
import PS1 from '../ps1';
import Cursor from '../cursor';

export const DEFAULTS = {
  classes: {
    element: 'console-line',
    content: 'console-line-content'
  }
};

export default (props) => {
  const classes = Object.assign({}, DEFAULTS.classes, props.classes);
  return (
    <pre class={ classes.element }>{
      props.ps1 && (
        <PS1 { ...props.ps1 } />
      )
    }<span class={ classes.content }>{
      props.content
    }</span>{
      props.write && (
        <Cursor { ...props.cursor } />
      )
    }</pre>
  );
};
