"use strict";
/* 
 * Bounds: create array without using arrays, implement array methods allow chaining.
 * */

function createArray (data = {}) {
    if (Array.isArray(data)) throw new TypeError("only support object or params as input");

    let returnData = {};
    let length;

    if (typeof data !== "object" || data === null) {
        if (arguments.length === 1 && typeof arguments[0] === 'number') {
            length = arguments[0];
        } 
        else {

            for (let i = 0; i < arguments.length; i++) {
                returnData[i] = arguments[i];
                length = arguments.length;
            }
        }

    } else {
        length = Object.keys(data).length;
        returnData= Object.assign({}, data);
    }


    return Object.freeze(Object.seal({
        get length() {return length},

        data: returnData,

        push:(item) => {
            returnData[length]= item;
            length++;
        },

        pop:() => {
            if (length === 0) return;
            const value = returnData[length];
            delete returnData[length - 1];
            length--;
            return value;
        },

        filter (cb) {
            const res = {};
            for (let i = 0; i < length; i++) {
                if(cb(returnData[i])) res[i] = returnData[i];
            }
            return createArray(res);
        },

        shift () {
            const first = returnData[0];

            for (let i = 0; i < length; i++) {
                returnData[i] = returnData[i+1]
            }
            delete returnData[length - 1];
            length--;
            return first;
        },

        at (index) {
            if (index < 0) return returnData[length + index];
            if (index > length) throw new RangeError(`Index out of bounds, index: ${index}`);
            return returnData[index];
        }

    }));
}

module.exports = createArray;

