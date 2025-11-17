/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003B76", // Deep Blue
        secondary: "#F59422", // Orange
        accent: "#EFB626", // Yellow
        mute: "#F9FAFB", // White Bg
        fadedyellow: "#EFB626",
        fadedorange: "#F59422",
        fadedblue: "#0D47A1", 
        fadedviolet: "#003B76"
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      backgroundImage: {
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-faded': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
