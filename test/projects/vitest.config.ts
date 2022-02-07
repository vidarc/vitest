/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        root: './test-one',
        globalSetup: [
          './globalSetup/default-export.js',
          './globalSetup/named-exports.js',
          './globalSetup/ts-with-imports.ts',
          './globalSetup/another-vite-instance.ts',
        ],
        setupFiles: ['./setupFiles/add-something-to-global.ts'],
      },
      {
        root: './test-two',
        globalSetup: [
          './globalSetup/default-export.js',
          './globalSetup/named-exports.js',
          './globalSetup/ts-with-imports.ts',
          './globalSetup/another-vite-instance.ts',
        ],
        setupFiles: ['./setupFiles/add-something-to-global.ts'],
      },
    ],
  },
})
