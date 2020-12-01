const _ = {
  clamp (number, lower, upper) {
    const lowerClampedValue = Math.max(number, lower); // returns the larger of the two values passed in
    const clampedValue = Math.min(lowerClampedValue, upper); //compares the previously returned larger value with the third value passed in, and returns the smaller of the two 
    return clampedValue;
  },

  /* Example _.clamp(4, 5, 7)
lowerClampedValue = Math.max(4, 5) -> 5 
clampedValue = Math.min(5, 7) -> 5 */

  inRange (number, startValue, endValue) {
    if (endValue === undefined) {
      endValue = startValue;
      startValue = 0;
    };
    if (startValue > endValue) {
      let tempEndValue = endValue;
      endValue = startValue;
      startValue = tempEndValue;
    };
    let isInRange = number >= startValue && number < endValue;
    return isInRange;
  },

  words (string) {
    let arr = string.split(' ');
    return arr;
  },

  pad (string, targetLength) {
    if (targetLength <= string.length) {
      return string;
    };
    let paddingStart = Math.floor((targetLength - string.length) / 2);
    let paddingEnd = targetLength - string.length - paddingStart;
    let paddedString = ' '.repeat(paddingStart) + string + ' '.repeat(paddingEnd);
    return paddedString;
  },

  has (object, key) {
    let hasValue = object[key] !== undefined;
    return hasValue;
  },

  invert (object) {
    let invertedObj = {};
    for (let key in object) {
      let originalValue = object[key];
      //invertedObject = {originalValue: key} -> This is what is given as solution but checked the forums, it doesn't actually render the new object with all inverted key-value pairs, it will just replace the invertedObj on each iteration, and it will only have one property
      invertedObject[originalValue] = key;
      //invertedObj[object[key]] = key; -> alternative syntax - doesn't use the originalValue variable
    }
    return invertedObj;
  },

  findKey (object, predicate) {
    for (let key in object) {
      let findKey = predicate(object[key]);
      if (findKey) {
        return key; // returns the first key that has a value that returns a truthy value from the predicate function
      }
    }
    return undefined; // return undefined to address all cases where no truthy values were returned from predicate.
  },

  drop (array, number) {
    if (!number) {
      array.shift(); // removes the first element from the arr if the number is undefined
      return array; // mutates original arr so we don't need to store it in a variable
    } else {
      let droppedArray = array.slice(number); // creates a new copy of the original arr with the specified number of elements dropped from the beginning of the arr 
      return droppedArray; 
    };
  },

  dropWhile (array, predicate) {
    let dropNumber = array.findIndex((element, index) => !predicate(element, index, array)); 
    //findIndex() iterates through the arr and takes an anonymous callback function as argument. 
    //Each element will be tested by the provided function and when they return truthy, we change their value to falsy because findIndex() normally looks for the first truthy value, but here we want it to return the first falsy value. 
    //if after call predicate() element is truthy -> gets converted to falsy, so that element won't cause dropWhile() to stop dropping elements since findIndex() sees it as falsy
    //if after call predicate() element is falsy -> gets converted to truthy, so that element will cause dropWhile() to stop dropping elements since findIndex() sees it as truthy. Elements need to drop until predicate return falsy (before conversion) so that's what we want.
    let droppedArray = this.drop(array, dropNumber); // we pass in the index that returned falsy after the predicate() call as the number of elements to drop in total (if index is 3, the elements with index 0, 1 and 2 will drop)
    return droppedArray;
  },

  chunk (array, size) {
    if (!size) {
      size = 1;
    }
    let arrayChunks = [];
    for (let i = 0; i < array.length; i+=size) {
      let arrayChunk = array.slice(i, i+size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks;
  }

    /* Alternative solution with a while loop:
    if (!size) {
      size = 1;
    }
    let arrayCopy = array.slice(); // splice() method below mutates the array, so we make a copy of the original array
    let results = [];
    while (arrayCopy.length) {
    results.push(arrayCopy.splice(0, size)); // size is the number of elements in the array to remove from the start (here 0th) index
  }
  return results;
  }*/

/* Alternative solution using a while loop ad the drop() method:
  if (!size) {
      size = 1;
    }
    let results = [];
    while (array.length) {
      let arrayChunk = this.drop(size);
      results.push(arrayChunk);
  }
    return results;
  }*/


};


// Do not write or modify code below this line.
module.exports = _;