import './App.css';
import {AppRouter} from "./router";
import {AuthenticationProvider, AuthorizationProvider} from "@trionesdev/auth-react";

function App() {
    return (
        <AuthenticationProvider
            authenticationRequest={() => Promise.resolve(false)}
            onUnAuthenticated={() => {
                console.log("onUnAuthenticated");
                window.location.href = "/#/sign-in";
            }} onSignOut={() => {
            console.log("onSignOut");
            window.location.href = "/#/sign-in";
        }}>
            <AuthorizationProvider authorizationRequest={() => Promise.resolve({
                master: false,
                permissions: ["security", "create", "update"]
            })}>
                <AppRouter/>
            </AuthorizationProvider>
        </AuthenticationProvider>
    );
}

export default App;
