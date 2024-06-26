import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: [
      'src/**/*.ts',
    ],
    threads: false,
    include: ["tests/**/*.test.ts"]
  },
  define: {
    'import.meta.vitest': false,
  },
})