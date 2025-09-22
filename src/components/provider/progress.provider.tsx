'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="2px"
                color="#1d1d14ff"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};

