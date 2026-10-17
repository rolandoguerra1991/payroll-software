import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
    it('joins truthy class values', () => {
        expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
    });

    it('ignores falsy class values', () => {
        expect(cn('px-2', false, undefined, null, 'py-1')).toBe('px-2 py-1');
    });

    it('merges conflicting tailwind utilities keeping the last one', () => {
        expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('supports conditional objects and arrays', () => {
        expect(cn(['px-2', { 'py-1': true, 'py-4': false }])).toBe('px-2 py-1');
    });
});
