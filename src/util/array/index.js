const equals = (a, b) => {
  if (!(Array.isArray(a) && Array.isArray(b))) {
    throw new Error('Invalid parameter: expected array.');
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] instanceof Array
      && b[i] instanceof Array) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    } else if (a[i] !== b[i]) {
      return false;
    }
  }
  
  return true;
};

export default {
  equals
};
