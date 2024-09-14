import React from 'react';
import './App.css';
import {AppRouter} from "./router";
import {AuthProvider, PermissionProvider} from "@trionesdev/commons-react";

function App() {
    return (
        <div>
            <AuthProvider authRequest={() => Promise.resolve(false)} onUnAuthenticated={() => {
                console.log("onUnAuthenticated");
                window.location.href = "/#/sign-in";
            }}>
                <PermissionProvider policyRequest={() => Promise.resolve({master: false, permissions: ["security"]})}>
                    <AppRouter/>
                </PermissionProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
