
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { user, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#08070d]">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
