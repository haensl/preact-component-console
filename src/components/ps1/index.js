import { h } from 'preact';

export const DEFAULTS = {
  class: 'console-ps1',
  content: '$'
};

const PS1 = (props) => (
  <span class={ props.class || DEFAULTS.class }>{
    props.content || DEFAULTS.content
  }</span>
);

export default PS1;
