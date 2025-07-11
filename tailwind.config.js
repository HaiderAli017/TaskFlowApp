module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#5F3EFE',
          primaryLight: '#6B4AFC',
          background: '#F6F6F6',
          textDark: '#1A1A1A',
          textLight: '#888',
        },
        fontFamily: {
          mono: ['SpaceMono', 'monospace'],
        },
      },
    },
    plugins: [],
  };
  