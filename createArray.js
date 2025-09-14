/* TODO: create array without using arrays, implement array methods allow chaining. */
"use strict";

/**
 * Creates a custom array-like object with basic array methods.
 * 
 * @param {number | object | any[]} [data] - Initial data to populate the object:
 *   - If a single number is passed, creates a holey object with that length (empty slots).
 *   - If an object is passed, copies its indexed properties by key order.
 *   - If multiple arguments are passed, treats them as initial values.
 *   - If nothing is passed, creates an empty object.
 * 
 * @returns {{
 *   length: number,
 *   push: (item: any) => number,
 *   pop: () => any,
 *   filter: (callback: (value: any, index: number) => boolean) => object,
 *   shift: () => any,
 *   at: (index: number) => any,
 *   map: (callback: (value: any, index: number, obj: object) => any, thisArg?: any) => object
 * }} Custom array-like object supporting common array methods.
 * 
 * Methods behave similarly to native arrays but work on this object structure.
 */
function createArray (data = {}) {
    if (Array.isArray(data)) throw new TypeError("only support object or params as input");

    const api = {};
    let length;

    if (typeof data !== "object" || data === null) {
        // if single param was provided - create a holey object of same size
        if (arguments.length === 1 && typeof arguments[0] === 'number') {
            length = arguments[0];
        } else {
            // if multiple arguments were passed treat them as the inital values
            for (let i = 0; i < arguments.length; i++) {
                api[i] = arguments[i];
            }
            length = arguments.length;
        }

    } else {
        // if non null object were passed copy its value by key order
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            api[i] = data[i];
        }
        length = keys.length;
    }

    Object.defineProperty(api, "length", {
        get(){return length},
        enumerable: false,
    });

    Object.defineProperty(api, "push", {
        value: function (data) {
            api[length] = data;
            length++;
            return length;
        },
        enumerable: false,
    });

    Object.defineProperty(api, "pop", {
        value: function(value = "") {
            if (value) throw new Error("Pop dosn't take input params");
            if (length === 0) return;
            value = api[length - 1];
            delete api[length - 1];
            length--;
            return value;
        },
        enumerable: false,
    });

    Object.defineProperty(api, "filter", {
        value: function(cb) {
            const res = createArray();
            for (let i = 0; i < length; i++) {
                if(cb(api[i], i)) res.push(api[i]);
            }
            return res;
        },
        enumerable: false,
    });

    Object.defineProperty(api, "shift", {
        value: function () {
            if (length === 0) return;
            const first = api[0];

            for (let i = 0; i < length; i++) {
                api[i] = api[i+1]
            }
            delete api[length - 1];
            length--;

            return first;
        },
        enumerable: false,
    });

    Object.defineProperty(api, "at", {
        value: function (index) {
            if (index < 0) return api[length + index];
            if (index >= length) throw new RangeError(`Index out of bounds, index: ${index}`);
            return api[index];
        },
        enumerable: false,
    });

    Object.defineProperty(api, "map", {
        value: function(cb = "", thisArg) {
            if (typeof cb !== 'function') 
                throw new TypeError("Map takes argument as a callback function");

            const res = createArray();
            for (let i = 0; i < length; i++) res.push(cb.call(thisArg, api[i], i, api));

            return res;
        },
        enumerable: false,
    });

    return api;
}

module.exports = createArray;

