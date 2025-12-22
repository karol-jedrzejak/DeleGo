import { useContext } from "react";
import {  Route, Routes } from "react-router-dom";

import { ROUTES } from "@/routes/Routes.tsx"

import { Error } from "@/components";

import { AuthContext } from "@/providers/AuthProvider.js";

type RouteObject = {
  PATH?: string;
  LINK?: string | ((id: number) => string);
  COMPONENT?: React.ComponentType<any> | null;
  [key: string]: any; // inne zagnieżdżone grupy
};

const renderRoutes = (routes: RouteObject, parentKey = ''): React.ReactNode[] => {
  
  const authData = useContext(AuthContext);

  const elements: React.ReactNode[] = [];

  for (const key in routes) {
    if (!Object.prototype.hasOwnProperty.call(routes, key)) continue;

    const route = routes[key];

    // Wyciągamy dzieci (properties inne niż PATH/LINK/COMPONENT)
    const childKeys = Object.keys(route).filter(
      k => !['PATH', 'LINK', 'COMPONENT'].includes(k)
    );

    // Unikalny klucz dla React
    const routeKey = parentKey ? `${parentKey}-${key}` : key;

    // Jeśli jest PATH i COMPONENT (i COMPONENT nie null) → tworzymy Route
    if (route.PATH && route.COMPONENT) {
      const Component = route.COMPONENT;

      let childrenRoutes: React.ReactNode[] = [];
      if (childKeys.length > 0) {
        // Sprawdzenie zapobiega cyklom i pustym children
        const childObjects = childKeys.reduce((acc, k) => {
          if (route[k] && typeof route[k] === 'object') {
            acc[k] = route[k];
          }
          return acc;
        }, {} as RouteObject);

        childrenRoutes = renderRoutes(childObjects, routeKey);
      }
      
      let granted = true;

      if(route.PERMISSIONS)
      {
        Object.keys(route.PERMISSIONS).forEach(level1Key => {
          const level1Value = route.PERMISSIONS[level1Key];
          
          // Sprawdzamy drugi poziom
          Object.keys(level1Value).forEach(level2Key => {
            const level2Value = level1Value[level2Key];
            const user_level = authData.user?.permissions?.[level1Key]?.[level2Key] ?? 0;
            if(user_level < level2Value)
            {
              granted = false;
            }
          });
        });
      };
        
      if(granted)
      {
        elements.push(
          <Route key={routeKey} path={route.PATH} element={<Component />}>
            {childrenRoutes.length > 0 ? childrenRoutes : null}
          </Route>
        );
      } else {
        elements.push(
          <Route key={routeKey} path={route.PATH} element={<Error><Error.Text type="authorization">Brak Uprawnień do Zasobu</Error.Text></Error>}>
            {childrenRoutes.length > 0 ? childrenRoutes : null}
          </Route>
        );
      };

    } else if (childKeys.length > 0) {
      // Jeśli brak komponentu, przetwarzamy tylko dzieci
      const childObjects = childKeys.reduce((acc, k) => {
        if (route[k] && typeof route[k] === 'object') {
          acc[k] = route[k];
        }
        return acc;
      }, {} as RouteObject);

      elements.push(...renderRoutes(childObjects, routeKey));
    }
  }

  return elements;
};



const Router = () => {
  return (   
    <Routes>
        {renderRoutes(ROUTES)}
        <Route path="*" element={<Error><Error.Text type="standard">Strona nie istnieje.</Error.Text></Error>}/>
    </Routes>
  );
};

export default Router;