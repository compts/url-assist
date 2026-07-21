/**
 * Create a serialize data if you are coming to php
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * phpUnSerialize('s:6:"Violet";')
 * // => 'Violet'
 */
declare function phpUnSerialize(value: any): any;
export default phpUnSerialize;
