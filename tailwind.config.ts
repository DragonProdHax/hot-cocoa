/** @type {import('tailwindcss').Config} */
import { themes } from './src/lib/theme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      ...themes,
      {
        amoled: {
          "primary": "#fff",
          "primary-content": "#000",
          "secondary": "#42f5aa",
          "secondary-content": "#111827",
          "accent": "#9d3bff",
          "accent-content": "#eaddff",
          "neutral": "#0a0a0a",
          "neutral-content": "#ffffff",
          "base-100": "#000",
          "base-200": "#0a0a0a",
          "base-300": "#060606",
          "base-content": "#fff",
          "info": "#3b82f6",
          "info-content": "#010615",
          "success": "#6ee7b7",
          "success-content": "#0a0715",
          "warning": "#f43f5e",
          "warning-content": "#fff",
          "error": "#f43f5e",
          "error-content": "#fff",
        },
      },
      {
        "cotton-candy": {
          "primary": "#ff9ec7",
          "primary-content": "#ffffff",
          "secondary": "#a8e6ff",
          "secondary-content": "#0d4f6b",
          "accent": "#ffc4dd",
          "accent-content": "#6b1538",
          "neutral": "#f8f0ff",
          "neutral-content": "#4a4a4a",
          "base-100": "#ffffff",
          "base-200": "#fef7ff",
          "base-300": "#f5e6ff",
          "base-content": "#4a4a4a",
          "info": "#87ceeb",
          "info-content": "#0d3d52",
          "success": "#98fb98",
          "success-content": "#1a5a1a",
          "warning": "#ffb6c1",
          "warning-content": "#6b1538",
          "error": "#ff69b4",
          "error-content": "#ffffff",
        },
      },
      {
        "abstract": {
          "primary": "#8b5cf6",
          "primary-content": "#ffffff",
          "secondary": "#06b6d4",
          "secondary-content": "#ffffff",
          "accent": "#f59e0b",
          "accent-content": "#000000",
          "neutral": "#1f2937",
          "neutral-content": "#d1d5db",
          "base-100": "rgba(17, 24, 39, 0.95)",
          "base-200": "rgba(31, 41, 55, 0.9)",
          "base-300": "rgba(55, 65, 81, 0.85)",
          "base-content": "#f9fafb",
          "info": "#3b82f6",
          "info-content": "#ffffff",
          "success": "#10b981",
          "success-content": "#ffffff",
          "warning": "#f59e0b",
          "warning-content": "#000000",
          "error": "#ef4444",
          "error-content": "#ffffff",
        },
      },
    ],
  },

  plugins: [require('daisyui')],
};
