import { of } from "rxjs";
import { delay } from "rxjs/operators";

const requestHandleSignInType = "REQUEST_HANDLE_SIGN_IN_TYPE";
const requestHandleSignOutType = "REQUEST_HANDLE_SIGN_OUT_TYPE";
const receiveHandleSignInType = "RECEIVE_HANDLE_SIGN_IN_TYPE";
const errorHandleSignInType = "ERROR_HANDLE_SIGN_IN_TYPE";

const initialState = {
    currentUser: null,
    isLoading: false,
    isError: false,
    errorMessage: null
};

export const actionCreators = {
    handleSignIn: (email: string, password: string) => async (dispatch: any) => {
        dispatch({
            type: requestHandleSignInType,
            payload: {
                isLoading: true,
                currentUser: null
            }
        });
        
        of({
            data: {
                avatar: "",
                fullName: "Gavin Bonneville",
                firstName: "Gavin",
                lastName: "Bonneville",
                address: "1234 France Ave. N.",
                city: "Minneapolis",
                state: "Minnesota",
                zip: "55555",
                phone: "123-123-1234",
                email: email
            }
        }).pipe(
            delay(3000)
        ).subscribe(response => {
            console.log(response.data);
            dispatch({
                type: receiveHandleSignInType,
                payload: {
                    isLoading: false,
                    currentUser: response.data
                }
            });
        }, error => {
            console.error("Sign-in attempt failed");
            dispatch({
                type: errorHandleSignInType,
                payload: {
                    isLoading: false,
                    isError: true,
                    errorMessage: `${error.error} ${error.message}`
                }
            });
        });
    },
    handleSignOut: () => (dispatch: any) => {
        dispatch({
            type: requestHandleSignOutType,
            payload: {
                currentUser: null
            }
        });
    }
};

export const reducer = (state: any, action: any) => {
    state = state || initialState;
    switch (action.type) {
        case requestHandleSignInType:
        case receiveHandleSignInType:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: action.payload.isLoading,
            };
        case errorHandleSignInType:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                isError: action.payload.isError,
                errorMessage: action.payload.errorMessage
            };
        case requestHandleSignOutType:
            return {
                currentUser: action.payload.currentUser,
            };
        default:
            return state;
    }
};
