import { useContext } from "react";

import { AuthContext } from "@/providers/AuthProvider";
import MessageProvider from '@/providers/MessageProvider';

import { Loading, Navbar } from "@/components";

import BodyRouter from '@/routes/Router';
import Login from '@/pages/auth/Login';

function Body() {
    const authData = useContext(AuthContext);
    return (
        <>
            {authData.loadingUser ? (
                <>
                    <Loading fullScreen={true}/>
                </>
            ) :(
                <>
                    {!authData.user ? (
                        <>
                            <div className='min-h-screen flex flex-col justify-center items-center'>
                                <Login/>
                            </div>
                        </>
                    ) :(
                        <>
                            <div className='min-h-screen flex flex-col relative'>
                                <Navbar/>
                                <MessageProvider>
                                    <BodyRouter/>
                                </MessageProvider>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Body
