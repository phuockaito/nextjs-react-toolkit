import { createContext, useContext } from 'react';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    let sharedState = "whatever you want";

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
};
