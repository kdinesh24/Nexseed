import chalk from "chalk";
import boxen from "boxen";
import { createAsciiArt } from "./ascii.js";

export const showWelcomeBanner = async () => {
  console.clear();
  console.log(); // Add some space at top

  try {
    // Create large ASCII art for NEXSEED
    const asciiArt = await createAsciiArt("NEXSEED");

    // Use white color like your website
    const coloredAscii = chalk.white.bold(asciiArt);

    console.log(coloredAscii);
    console.log();

    // Add subtitle in gray
    const subtitle = chalk.gray(
      "The ultimate CLI for launching production-ready Next.js applications in seconds.",
    );

    console.log(`                    ${subtitle}`);
    console.log();
  } catch (error) {
    // Fallback if ASCII generation fails
    const fallback = chalk.white.bold(`
  ███╗   ██╗███████╗██╗  ██╗███████╗███████╗███████╗██████╗ 
  ████╗  ██║██╔════╝╚██╗██╔╝██╔════╝██╔════╝██╔════╝██╔══██╗
  ██╔██╗ ██║█████╗   ╚███╔╝ ███████╗█████╗  █████╗  ██║  ██║
  ██║╚██╗██║██╔══╝   ██╔██╗ ╚════██║██╔══╝  ██╔══╝  ██║  ██║
  ██║ ╚████║███████╗██╔╝ ██╗███████║███████╗███████╗██████╔╝
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═════╝ 
    `);

    console.log(fallback);
    console.log(
      chalk.gray(
        "              The ultimate CLI for launching production-ready Next.js applications",
      ),
    );
    console.log();
  }
};

export const showProjectCreationBanner = (projectName) => {
  const message = `🎯 Creating a new project: ${chalk.cyan.bold(
    projectName,
  )}`;

  const boxedMessage = boxen(message, {
    padding: 1,
    margin: { top: 1, bottom: 1, left: 2, right: 2 },
    borderStyle: "round",
    borderColor: "cyan",
    backgroundColor: "#001122",
    dimBorder: false,
  });

  console.log(boxedMessage);
};

export const showCompletionBanner = (projectName) => {
 
};