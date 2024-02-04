export const replaceEle = (
	NAME,
	ADDRESS,
	MOBILE_NUMBER,
	EMAIL_ADDRESS,
	COLLEGE_NAME,
	YEAR,
	DEGREE,
	PROJECT_TITLE1,
	GITHUB_LINK1,
	SKILLS1,
	DETAILS1,
	PROJECT_TITLE2,
	GITHUB_LINK2,
	SKILLS2,
	DETAILS2,
	PROJECT_TITLE3,
	GITHUB_LINK3,
	SKILLS3,
	DETAILS3
) => {
	const ele = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n% Medium Length Professional CV\n% LaTeX Template\n% Version 3.0 (December 17, 2022)\n%\n% This template originates from:\n% https://www.LaTeXTemplates.com\n%\n% Author:\n% Vel (vel@latextemplates.com)\n%\n% Original author:\n% Trey Hunner (http://www.treyhunner.com/)\n%\n% License:\n% CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)\n%\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n%----------------------------------------------------------------------------------------\n%\tPACKAGES AND OTHER DOCUMENT CONFIGURATIONS\n%----------------------------------------------------------------------------------------\n\n\\documentclass[\n\t%a4paper, % Uncomment for A4 paper size (default is US letter)\n\t11pt, % Default font size, can use 10pt, 11pt or 12pt\n]{resume} % Use the resume class\n\n\\usepackage{ebgaramond} % Use the EB Garamond font\n\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=red]{hyperref}\n\n%------------------------------------------------\n\n\\name{${NAME}} % Your name to appear at the top\n\n% You can use the \\address command up to 3 times for 3 different addresses or pieces of contact information\n% Any new lines (\\\\) you use in the \\address commands will be converted to symbols, so each address will appear as a single line.\n\n\\address{${ADDRESS}} % Main address\n\n\\address{${ADDRESS}} % A secondary address (optional)\n\n\\address{${MOBILE_NUMBER} \\\\ ${EMAIL_ADDRESS}} % Contact information\n\n%----------------------------------------------------------------------------------------\n\n\\begin{document}\n\n%----------------------------------------------------------------------------------------\n%\tEDUCATION SECTION\n%----------------------------------------------------------------------------------------\n\n\\begin{rSection}{Education}\n\t\n\t\\textbf{${COLLEGE_NAME}} \\hfill \\textit{${YEAR}} \\\\ \n\t ${DEGREE} \\\\\n\tOverall CGPA: CGPA\n\t\n\\end{rSection}\n\n%----------------------------------------------------------------------------------------\n%\tWORK EXPERIENCE SECTION\n%----------------------------------------------------------------------------------------\n\n\\begin{rSection}{Projects}\n\n\t\\begin{rSubsection}{${PROJECT_TITLE1}}{\\href{${GITHUB_LINK1}}{LINK}}{${SKILLS1}}{}\n\t\t${DETAILS1}\n\t\t% \\item\n\t\\end{rSubsection}\n\n%------------------------------------------------\n\n\t\\begin{rSubsection}{${PROJECT_TITLE2}}{\\href{${GITHUB_LINK2}}{LINK}}{${SKILLS2}}{}\n\t\t ${DETAILS2} \n\t\t% \\item\n\t\\end{rSubsection}\n\n%------------------------------------------------\n\n\\begin{rSubsection}{${PROJECT_TITLE3}}{\\href{${GITHUB_LINK3}}{LINK}}{${SKILLS3}}{}\n\t${DETAILS3}\n\t% \\item\n\\end{rSubsection}\n\n\\end{rSection}\n\n%----------------------------------------------------------------------------------------\n%\tTECHNICAL STRENGTHS SECTION\n%----------------------------------------------------------------------------------------\n\n% \\begin{rSection}{Technical Strengths}\n\n% \t_SKILLS_ALL_\n\n% \\end{rSection}\n\n%----------------------------------------------------------------------------------------\n%\tEXAMPLE SECTION\n%----------------------------------------------------------------------------------------\n\n%\\begin{rSection}{Section Name}\n\n\t%Section content\\ldots\n\n%\\end{rSection}\n\n%----------------------------------------------------------------------------------------\n\n\\end{document}\n`;
	return ele;
};
