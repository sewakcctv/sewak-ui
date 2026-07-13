import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { useResolvedColorScheme } from './color-scheme.js';
const SewakContext = createContext(undefined);
const fallbackValue = {
    density: 'comfortable',
    colorScheme: 'system',
    resolvedColorScheme: 'light',
};
let hasWarnedAboutMissingProvider = false;
export function SewakProvider({ density = 'comfortable', colorScheme = 'system', systemColorScheme = 'light', children, }) {
    const resolvedColorScheme = useResolvedColorScheme(colorScheme, systemColorScheme);
    const value = { density, colorScheme, resolvedColorScheme };
    return (_jsx(SewakContext.Provider, { value: value, children: _jsx("div", { "data-sewak-density": density, "data-sewak-color-scheme": resolvedColorScheme, children: children }) }));
}
export function useSewak() {
    const value = useContext(SewakContext);
    if (value)
        return value;
    if (process.env.NODE_ENV !== 'production' && !hasWarnedAboutMissingProvider) {
        hasWarnedAboutMissingProvider = true;
        console.warn('useSewak() was called outside SewakProvider; using comfortable/system defaults.');
    }
    return fallbackValue;
}
