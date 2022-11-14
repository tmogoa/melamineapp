import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            await getUser(setUser);
            setIsReady(true);
        })();
    }, []);

    const context = {
        user,
        storeUser,
        destroyUser,
        isReady,
    };

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );

    async function storeUser(user_, postFunc) {
        try {
            await AsyncStorage.setItem("@user", JSON.stringify(user_));
            setUser(user_);
            postFunc();
        } catch (e) {
            console.log(e);
        }
    }

    async function destroyUser(postFunc) {
        try {
            await AsyncStorage.removeItem("@user");
            postFunc();
        } catch (e) {
            console.log(e);
        }
    }

    async function getUser() {
        const user_ = await AsyncStorage.getItem("@user");
        setUser(JSON.parse(user_));
    }
};
