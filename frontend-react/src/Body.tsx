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
                            <div className='min-h-screen flex flex-row relative'>
                                <Navbar/>
                                <div className="min-h-screen w-full flex flex-col">
                                    <MessageProvider>
                                        <BodyRouter/>
                                    </MessageProvider>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Body
