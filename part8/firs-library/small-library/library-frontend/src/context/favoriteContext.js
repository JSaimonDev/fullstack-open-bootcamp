import { createContext } from "react";
import { useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = (props) => {
    const [favorite, setFavorite] = useState();

    return (
        <FavoriteContext.Provider value={[favorite, setFavorite]}>
            {props.children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteContext;