import { h } from 'preact';
import './ps1.css';

export const DEFAULTS = {
  classes: {
    element: 'console-ps1'
  },
  content: '$'
};

const PS1 = (props) => (
  <span class={ (props.classes && props.classes.element) || DEFAULTS.classes.element }>{
    props.content || DEFAULTS.content
  }</span>
);

export default PS1;
