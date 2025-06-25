import './App.css';
import {AppRouter} from "./router";
import {AuthenticationProvider, AuthorizationProvider} from "@trionesdev/auth-react/src";

function App() {
    return (
        <div>
            <AuthenticationProvider authenticationRequest={() => Promise.resolve(false)} onUnAuthenticated={() => {
                console.log("onUnAuthenticated");
                window.location.href = "/#/sign-in";
            }}>
                <AuthorizationProvider authorizationRequest={() => Promise.resolve({master: false, permissions: ["security","create","update"]})}>
                    <AppRouter/>
                </AuthorizationProvider>
            </AuthenticationProvider>
        </div>
    );
}

export default App;