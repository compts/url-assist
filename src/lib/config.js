exports.configQueryString = {

    "arrayFormat": "[]",
    "equalSeparator": "=",
    "newLineSeparator": "&",
    "startWith": ""
};
const exemptListOfDomain = ['localhost'];
const objRegExpKey = {

    "alpha": '[a-zA-Z]',
    "any": '[a-zA-Z0-9\\-\\_.]',
    "number": '[0-9]',
    "string": '[a-zA-Z0-9]'
};

exports.exemptListOfDomain = exemptListOfDomain;

exports.objRegExpKey = objRegExpKey;
