// src/theme/antdTheme.ts
const antdTheme = {
    token: {
        // Primary Colors - Green
        colorPrimary: 'var(--primary)',
        colorPrimaryHover: 'var(--background-secondary)',
        colorPrimaryActive: 'var(--accent)',

    //     --background: #F9F9F9;
    // --background-secondary: #F3F5F8;
    // --background-tertiary: #F6F6F6;

        // Background Colors
        colorBgBase: 'var(--background)',
        colorBgContainer: 'var(--background-secondary)',
        colorBgElevated: 'var(--background-tertiary)',
        colorBgLayout: 'var(--background-secondary)',

        // Text Colors
        colorTextBase: 'var(--text-primary)',
        colorText: 'var(--text-primary)',
        colorTextSecondary: 'var(--text-secondary)',
        colorTextTertiary: 'var(--text-tertiary)',
        colorTextDisabled: 'var(--text-tertiary)',

        // Border Colors
        colorBorder: 'var(--border)',
        colorBorderSecondary: 'var(--border)',
        colorSplit: 'var(--border)',

        // Fill Colors
        colorFill: 'var(--hover)',
        colorFillSecondary: 'var(--background-secondary)',
        colorFillTertiary: 'var(--background)',

        // Interactive States
        colorBgTextHover: 'var(--hover)',
        colorBgTextActive: 'var(--primary)',
        controlItemBgHover: 'var(--hover)',
        controlItemBgActive: 'var(--primary)',

        // Component Colors
        colorLink: 'var(--primary)',
        colorLinkHover: 'var(--primary-hover)',
        colorSuccess: 'var(--success)',
        colorWarning: 'var(--warning)',
        colorError: 'var(--error)',
        colorInfo: 'var(--primary)',

        // Typography & Layout
        fontSize: 14,
        borderRadius: 12,
        borderRadiusSM: 8,
        borderRadiusLG: 16,
        fontFamily: 'var(--font-segoe)',
        
        // Box Shadow
        boxShadow: 'var(--shadow-sm)',
        boxShadowSecondary: 'var(--shadow-sm)',
    }
};

export default antdTheme;