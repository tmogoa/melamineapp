import React from "react";

import { AppContextProvider } from "./util/AppContext";
import Navigation from "./util/Navigation";

export default function App() {
    return (
        <AppContextProvider>
            <Navigation />
        </AppContextProvider>
    );
}
