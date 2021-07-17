import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";

import DarkModeToggle from "react-dark-mode-toggle";
export default function ThemeToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        if (theme == null) return null;
        return (
          <DarkModeToggle
            onChange={(isChecked) => toggleTheme(isChecked ? "dark" : "light")}
            checked={theme === "dark"}
            size={50}
          />
        );
      }}
    </ThemeToggler>
  );
}
