# preact-component-console
Console emulator preact component. Emulates realistic typing via dynamic char-typing delays.

[![NPM](https://nodei.co/npm/preact-component-console.png?downloads=true)](https://nodei.co/npm/preact-component-console/)

[![npm version](https://badge.fury.io/js/preact-component-console.svg)](http://badge.fury.io/js/preact-component-console)
[![Build Status](https://travis-ci.org/haensl/preact-component-console.svg?branch=master)](https://travis-ci.org/haensl/preact-component-console)


![Intro](intro.gif)

## Quick Start

1. Install the package

    via NPM

    ```bash
    npm i --save preact-component-console
    ```

    via yarn
    ```bash
    yarn add preact-component-console
    ```

2. Use the component

```javascript
import Console from 'preact-component-console';

// ...

  render() {
    <Console lines={[
      'Hi there!',
      'How are you today?'
    ]} />
  }
```

## Options

### lines `Array<string> | string`

The lines to write.

#### Example

```javascript
<Console
  lines={[
    'Hi there!',
    'How are you today?'
  ]}
/>
```

### console `Object`

Set options on the console component.

#### Signature

```javascript
{
  append: false, // whether to append lines
  classes: {
    element: 'console' // class to set on the root element
  },
  typing: {
    char: { // options concerning typing of individual characters
      avgMs: 150, // average duration for typing a char in milliseconds
      deviation: 0.3, // average deviation to apply to avgMs
      minMs: 50, // minimum duration for typing a char in milliseconds
      maxMs: Infinity // maximum duration for typing a char in milliseconds
    },
    line: { // options concerning typing of a line
      delay: { // options concerning the delay between lines
        avgMs: 1000, // average delay between to lines in milliseconds
        deviation: 0.5, // average deviation to apply to avgMs
        minMs: 500, // minimum delay between to lines in milliseconds
        maxMs: 1500 // maximum delay between to lines in milliseconds
      }
    }
  }
}
```

#### Example

```javascript
<Console
  console={{
    classes: {
      element: 'my-console' // set console component class to 'my-console'
    }
    typing={
      char: {
        avgMs: 200 // set average duration for typing a char to 200ms
      }
    }
  }}
  lines={[
    'Hi there!',
    'How are you today?'
  ]}
/>
```

### line `Object`

Set options for the line component(s).

#### Signature

```javascript
{
  classes: {
    element: 'console-line', // class to set on a line component
    content: 'console-line-content' // class to set on the line's text content
  }
}
```

#### Example

```javascript
<Console
  lines={[
    'Hi there!',
    'How are you today?'
  ]}
  line={{
    classes: {
      element: 'line-text' // set the css class name for line text to 'line-text'
    }
  }}
/>
```

### ps1 `Object`

Set options for the PS1 component.

#### Signature

```javascript
{
  classes: {
    element: 'console-ps1', // class to set on a ps1 component
  },
  content: '$' // string to display as ps1
}
```

### Example

```javascript
<Console
  lines={[
    'Hi there!',
    'How are you today?'
  ]}
  ps1={{
    content: "∆" // set the ps1 string to ∆
  }}
/>
```

### cursor `Object`

Set options for the cursor.

#### Signature

```javascript
{
  classes: {
    blink: 'console-cursor--blink', // class to set on the cursor component when visible (in addition to the class set in element)
    element: 'console-cursor', // class to set on a cursor component
    write: 'console-cursor--write' // class to set on the cursor component while writing (in additon to the class set in element)
    
  },
  intervalMs: 400 // duration between blink cycles in milliseconds
}
```

#### Example

```javascript
<Console
  lines={[
    'Hi there!',
    'How are you today?'
  ]}
  cursor={{
    intervalMs: 250 // set interval for cursor blinking to 250ms
  }}
/>
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
