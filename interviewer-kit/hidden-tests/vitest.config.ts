import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        include: ['interviewer-kit/hidden-tests/**/*.test.ts', 'interviewer-kit/hidden-tests/**/*.test.tsx'],
        environment: 'jsdom',
        setupFiles: ['interviewer-kit/hidden-tests/web/test-setup.ts'],
    },
});
