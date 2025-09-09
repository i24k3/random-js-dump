"use strict";

function createArray (data = {}) {
    if (Array.isArray(data)) return console.log("only support object or params as input");

    let _data = {}
    let _length;

    if (typeof data !== "object" || data === null) {
        for (let i = 1; i < arguments.length; i++) {
            const index = i - 1;
            _data[index] = arguments[i];
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
            if (_length === 0) return undefined;
            _length--;
            const value = _data[_length];
            delete _data[_length];
            return value;
        },

        filter : (cb) => {
            const result = createArray();
            for (let i = 0; i < _length; i++) {
                if(cb(_data[i])) result.push(_data[i]);
            }
            return result;
        }
    }
}

const arr = createArray({0:11, 1:22, 2:33, 3:44, 4:55});
// const arr = createArray(1, 2, 3, 4,55);
console.log(arr);
console.log("length: ",arr.length);
console.log("data: ",arr.data);

