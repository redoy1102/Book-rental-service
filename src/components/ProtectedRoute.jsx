import React from 'react';
import {useAuth} from "@contexts/AuthContext"

const ProtectedRoute = () => {
    const {user, loading} = useAuth();
    return (
        <div>
            
        </div>
    );
};

export default ProtectedRoute;