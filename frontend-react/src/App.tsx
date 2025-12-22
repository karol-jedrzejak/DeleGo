import { BrowserRouter } from "react-router-dom";

import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from '@/providers/AuthProvider';
import RouteTracker from '@/routes/RouteTracker';
import Body from '@/Body';

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteTracker />
        <AuthProvider>
          <ThemeProvider>
            <Body/>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
