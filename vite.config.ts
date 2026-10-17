import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, lazyPlugins } from 'vite-plus';

// Vitest reuses this Vite config, but a unit test run is not Laravel's HMR dev
// server. Without this, laravel-vite-plugin aborts every test run inside CI
// with "You should not run the Vite HMR server in CI environments". The guard
// stays active for `npm run dev` and `npm run build`.
if (process.env.VITEST) {
    process.env.LARAVEL_BYPASS_ENV_CHECK = '1';
}

export default defineConfig({
    plugins: lazyPlugins(() => [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        wayfinder({
            formVariants: true,
        }),
    ]),
    server: {
        watch: {
            ignored: [
                '**/.agents/**',
                '**/.claude/**',
                '**/.cursor/**',
                '**/.junie/**',
                '**/vendor/**',
            ],
        },
    },
    test: {
        environment: 'jsdom',
        include: ['resources/js/tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: [['text', { skipFull: false }], 'html'],
            reportsDirectory: 'coverage',
            // Only production source. Add an entry here when a new source
            // folder is created (e.g. stores, services).
            include: [
                'resources/js/components/**/*.{ts,vue}',
                'resources/js/composables/**/*.{ts,vue}',
                'resources/js/layouts/**/*.{ts,vue}',
                'resources/js/lib/**/*.ts',
                'resources/js/pages/**/*.{ts,vue}',
            ],
            exclude: ['resources/js/components/ui/**'],
            // Every source file must be fully covered; CI fails otherwise.
            thresholds: {
                100: true,
                perFile: true,
            },
        },
    },
    lint: {
        ignorePatterns: [
            'vendor/**',
            'node_modules/**',
            'public/**',
            'coverage/**',
            'bootstrap/ssr/**',
            'tailwind.config.js',
            'resources/js/actions/**',
            'resources/js/components/ui/*',
            'resources/js/routes/**',
            'resources/js/wayfinder/**',
        ],
        options: {
            denyWarnings: true,
            typeAware: true,
        },
    },
    fmt: {
        printWidth: 80,
        tabWidth: 4,
        singleQuote: true,
        semi: true,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: 'css',
        ignorePatterns: [
            // Agent skills are reference material, not source: several are
            // published by Boost (MIT) and the formatter rewrites their
            // markdown tables, which boost:update then overwrites.
            '.agents/**',
            '.github/**',
            'composer.json',
            'coverage/**',
            'resources/js/components/ui/*',
            'resources/views/mail/*',
        ],
        sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: 'resources/css/app.css',
        },
    },
});
