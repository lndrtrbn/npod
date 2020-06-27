/**
 * Transforms a dash_case string into a camelCase one.
 *
 * @param input The dash_case input to transform into camelCase.
 * @returns The camelCase output.
 */
export function dashToCamelCase(input: string): string {
    return input.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}