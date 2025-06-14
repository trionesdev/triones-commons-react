import './App.css';
import {AppRouter} from "./router";
import {AuthProvider, PermissionProvider} from "@trionesdev/commons-react/src";

function App() {
    return (
        <div>
            <AuthProvider authRequest={() => Promise.resolve(false)} onUnAuthenticated={() => {
                console.log("onUnAuthenticated");
                window.location.href = "/#/sign-in";
            }}>
                <PermissionProvider policyRequest={() => Promise.resolve({master: false, permissions: ["security","create","update"]})}>
                    <AppRouter/>
                </PermissionProvider>
            </AuthProvider>
        </div>
    );
}

export default App;