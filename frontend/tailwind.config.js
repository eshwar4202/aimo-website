/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				glow: "0 4px 20px rgba(147, 51, 234, 0.5)", // Violet glow
			},
		},
	},
	plugins: [],
};

