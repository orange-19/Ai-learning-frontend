import {createContext, useContext, useEffect, useState} from "react";
import creatUser from "../model/User";
import {getUserProfileByName} from "../service/profile";

const UserContext = createContext(null);

export function UserProvider({children,loggedInName}){
    const [user,setUser] = useState(creatUser());
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        getUserProfileByName(loggedInName)
            .then(data => {setUser(creatUser(data));
            setLoading(false);})
            .catch(err => { setError(err.message);
            setLoading(false);})
    }, [loggedInName]);

    return (
        <UserContext.Provider value={{user, loading, error}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(){
    const ctx = useContext(UserContext);
    if(!ctx) throw new Error("No user found");
    return ctx;
}