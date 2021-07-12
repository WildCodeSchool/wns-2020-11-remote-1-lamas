import React, { useState } from "react";

export const authReducer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = React.useReducer(
      (prevState: any, action: any) => {
          switch (action.type) {
            case "SIGN_IN":
              setIsLoggedIn(true)
              return {
                ...prevState,
                isLoggedIn
              };
            case "SIGN_OUT":
              setIsLoggedIn(false)
              return {
                ...prevState,
                isLoggedIn,
              };
          }
        },
        {
          isLoggedIn
        }
      );
    return [state, dispatch]
}