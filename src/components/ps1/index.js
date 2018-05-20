import { h } from 'preact';

export const DEFAULTS = {
  class: 'console-ps1',
  content: '$'
};

export default (props) => (
  <span class={ props.class || DEFAULTS.class }>{
    props.content || DEFAULTS.content
  }</span>
);
