import figlet from "figlet";

export const createAsciiArt = (text) => {
  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: "ANSI Shadow", // Large, bold font
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 120,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
};