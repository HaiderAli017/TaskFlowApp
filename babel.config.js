module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['nativewind/babel'], // Comment out or remove this line
    };
};
  