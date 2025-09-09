"use strict";
/* 
 * Bounds: create array without using arrays, implement array methods allow chaining.
 * */

function createArray (data = {}) {
    if (Array.isArray(data)) return console.log("only support object or params as input");

    let _data = {};
    let _length;

    if (typeof data !== "object" || data === null) {
        for (let i = 0; i < arguments.length; i++) {
            _data[i] = arguments[i];
        }
        _length = arguments.length;

    } else {
        _length = Object.keys(data).length;
        _data= data;
    }


    return {
        get length() {return _length},

        data: _data,

        push:(item) => {
            _data[_length]= item;
            _length++;
        },

        pop:() => {
            if (_length === 0) return;
            _length--;
            const value = _data[_length];
            delete _data[_length];
            return value;
        },

        filter (cb) {
            const res = {};
            for (let i = 0; i < _length; i++) {
                if(cb(_data[i])) res[i] = _data[i];
            }
            return createArray(res);
        },

        shift () {
            const first = _data[0];

            for (let i = 0; i < _length; i++) {
                _data[i] = _data[i+1]
            }
            delete _data[_length - 1];
            return first;
        },

        at (index) {
            if (index < 0) return 
            return _data[index];
        }

    }
}


const arr = createArray(1, 2, 3, 4,55);
console.log(arr);
console.log(arr.at(2));

