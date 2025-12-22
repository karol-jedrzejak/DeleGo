import { createContext, useState } from "react";

type ThemeContextType = {
  darkTheme: boolean;
  changeTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  changeTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkTheme");
    const isDark = saved === "true";

    if (isDark) document.documentElement.classList.add("dark");
    return isDark;
  });

  const changeTheme = () => {
    const newValue = !darkTheme;
    setDarkTheme(newValue);

    localStorage.setItem("darkTheme", String(newValue));

    document.documentElement.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
