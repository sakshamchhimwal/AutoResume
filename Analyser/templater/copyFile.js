import { readFile, writeFile } from "fs";

export const createTempFile = (templateNumber, replacements) => {
	const sourceFilePath =
		templateNumber == 0
			? "./resumes/resume1/template.tex"
			: "./resumes/resume2/cv_15.tex";
	const destFilePath =
		templateNumber == 0
			? "./resumes/resume1/temp_template.tex"
			: "./resumes/resume2/temp_cv_15.tex";
	readFile(sourceFilePath, "utf8", (err, fileData) => {
		if (err) {
			console.error(err);
			return;
		}

		writeFile(destFilePath, fileData, (err) => {
			if (err) {
				console.error(err);
				return;
			} else {
				console.log("File copied successfully!");
			}
		});
	});
	console.log(destFilePath);
	return destFilePath;
};
