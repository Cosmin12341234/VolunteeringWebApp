import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"; // import SignUpPage from "./pages/auth/SignUpPage";
import {Toaster} from "sonner";
import LoginPage from "@/pages/auth/LoginPage.tsx";
import SignUpPage from "@/pages/auth/SignUpPage.tsx";
import VolunteersPage from "@/pages/events/VolunteersPage.tsx";
import AdminsPage from "@/pages/events/AdminsPage.tsx";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";


function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Toaster/>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="/events" element={<VolunteersPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/admin" element={<AdminsPage/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
