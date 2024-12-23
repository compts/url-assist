module.exports = {
    "ignore": [
        "grassfile.js",
        ".eslintrc.js",
        "babel.config.js"
    ],
    "presets": [
        [
            '@babel/preset-env',
            {
                "targets": {"node": 'current'}
            }
        ],
        '@babel/preset-typescript'
    ]
};
