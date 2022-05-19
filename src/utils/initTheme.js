const initTheme = (theme) => {
  const currentTheme = theme.currentTheme;
  if (currentTheme === "light") {
    return "";
  } else if (currentTheme === null || currentTheme === "dark") {
    return "dark-theme"; // default
  } else {
    console.error("Error in theme mode, please debug");
  }
};

export { initTheme };
