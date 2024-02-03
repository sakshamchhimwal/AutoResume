import axios from "axios";
import { config } from "dotenv";
config();
import analyseReadme from "../analysers/readme.analyser.js";
import { AnalyseFiles, FileGetter } from "../analysers/texhstack.analyser.js";

const getFileContents = async (auth, fileUrl) => {
	const res = await axios.get(fileUrl, {
		headers: {
			Authorization: `Token ${auth}`,
			"User-Agent": "request",
		},
	});
	const contents = res.data.content.split("\n");
	let resStr = "";
	contents.forEach((ele) => {
		resStr = resStr.concat(atob(ele));
	});
	// console.log("19:",resStr);
	return resStr;
};

const getTechStack = async (auth, allFiles) => {
	const filterFiles = allFiles.map((ele) => {
		return { path: ele.path, url: ele.url };
	});
	const onlyFnames = filterFiles
		.filter((ele) => {
			if (
				!ele.path.includes(".json") &&
				!ele.path.includes(".yml") &&
				!ele.path.includes(".txt") &&
				!ele.path.includes(".config") &&
				!ele.path.includes(".svg") &&
				!ele.path.includes(".png") &&
				!ele.path.includes(".jpeg") &&
				!ele.path.includes(".mp4") &&
				!ele.path.includes(".webp") &&
				!ele.path.includes(".3gp") &&
				!ele.path.includes(".gitignore") &&
				!ele.path.includes(".github") &&
				!ele.path.includes("LICENSE") &&
				!ele.path.includes("/assets/") &&
				!ele.path.includes("README")
			) {
				return ele;
			}
		})
		.map((ele) => {
			return ele.path;
		});
	const returnedFiles = await JSON.parse(
		(await FileGetter(onlyFnames))
			.replaceAll("`", "")
			.replaceAll("json", "")
	);
	const getFileURLs = filterFiles.filter((ele) => {
		if (returnedFiles.includes(ele.path)) {
			return ele;
		}
	});
	const fileAnalysis = await Promise.all(
		getFileURLs.map(async (ele) => {
			const fileContent = await getFileContents(auth, ele.url);
			return { path: ele.path, contents: fileContent };
		})
	);

	const techStack = [];

	for (const ele of fileAnalysis) {
		try {
			// console.log(ele);
			const res = await AnalyseFiles(ele.contents);
			techStack.push({ path: ele.path, techStack: res });
		} catch (err) {
			// console.log(err);
			console.log("Err in techstack");
		}
	}
	// const parsedTech = await JSON.parse(tech);
	return techStack;
};

const getReadMeCrux = async (auth, fileURL) => {
	const getReadMeDets = await getFileContents(auth, fileURL);
	const res = await analyseReadme(getReadMeDets);
	return res;
};

const getRepoLanguages = async (auth, username, repoName) => {
	const res = await axios.get(
		`https://api.github.com/repos/${username}/${repoName}/languages`,
		{
			Authorization: `Token ${auth}`,
			"User-Agent": "request",
		}
	);
	const languages = res.data;
	return languages;
};

const getAllFiles = async (auth, username, repoName) => {
	const res = await axios.get(
		`https://api.github.com/repos/${username}/${repoName}/git/trees/main?recursive=1`,
		{
			headers: {
				Authorization: `Token ${auth}`,
				"User-Agent": "request",
			},
		}
	);
	const allFiles = [];
	const files = res.data.tree;
	await files.forEach(async (ele) => {
		allFiles.push({ path: ele.path, url: ele.url });
	});
	return allFiles;
};

export const analyseRepo = async (auth, repoURL) => {
	const splitURL = repoURL.split("/");
	const username = splitURL[3];
	const repoName = splitURL[4];
	const allFiles = await getAllFiles(auth, username, repoName);
	const readMeURL = allFiles.filter((ele) => {
		if (ele.path.includes("README") || ele.path.includes("readme")) {
			return ele;
		}
	})[0].url;
	let readMeAnalysis = await getReadMeCrux(auth, readMeURL);
	readMeAnalysis = await JSON.parse(
		readMeAnalysis.replaceAll("`", "").replaceAll("json", "")
	);
	let repoLangs = await getRepoLanguages(auth, username, repoName);
	let techStack = await getTechStack(auth, allFiles);
	techStack = techStack.map((ele) => {
		return JSON.parse(
			ele.techStack.replaceAll("`", "").replaceAll("json", "")
		);
	});
	// console.log("Extracted Info",{ readMeAnalysis, repoLangs, techStack });
	return { readMeAnalysis, repoLangs, techStack };
};

// export const analyseRepo = async (auth, repoURL) => {
// 	return {
// 		readMeAnalysis: {
// 			skills: [
// 				"Python",
// 				"Flask",
// 				"GPT-3.5 Turbo API",
// 				"Pexels API",
// 				"HTML",
// 				"CSS",
// 			],
// 			features: [
// 				"AI-Driven Content Creation",
// 				"Intelligent Slide Generation",
// 				"Customizable Themes",
// 				"User-Friendly Interface",
// 				"Generates slide content based on user's input",
// 				"Proposes titles and content for each slide",
// 				"Gives a personalized touch to the presentation",
// 				"Clear instructions and intuitive design for seamless presentation generation",
// 				"Uses the free version of the OpenAI API",
// 				"Integrates with the Pexels API for image search",
// 			],
// 		},
// 		repoLangs: {
// 			Python: 14783,
// 			JavaScript: 1932,
// 		},
// 		techStack: [
// 			{
// 				insights: [
// 					"The code follows the PEP8 coding conventions, such as using snake_case for variable and function names, and indentations for blocks of code.",
// 					"The code uses the Jinja2 templating engine for rendering HTML templates, which allows for a clean separation of code and design.",
// 					"The code employs the Flask-SQLAlchemy extension for integrating with databases, providing a powerful and flexible ORM for working with relational data.",
// 				],
// 				techStack: [
// 					"Python",
// 					"Flask",
// 					"Jinja2",
// 					"Flask-SQLAlchemy",
// 					"Flask-Login",
// 					"Flask-Bcrypt",
// 					"dotenv",
// 				],
// 			},
// 			{
// 				insights: [
// 					"The code utilizes the Flask framework, a prominent microframework for developing web applications in Python, simplifying the creation and management of web applications.",
// 					"The code employs SQLAlchemy, a popular Python library facilitating database interaction and object-relational mapping (ORM) capabilities, allowing for the seamless conversion of database rows into Python objects.",
// 					"The code is concise and well-structured, showcasing adherence to recommended coding conventions and practices, including the use of proper indentation, spacing, and variable naming.",
// 				],
// 				techStack: ["Python", "Flask", "SQLAlchemy"],
// 			},
// 			{
// 				insights: [
// 					"The code follows the best practices of modularity by splitting the functionality into smaller, manageable modules.",
// 					"The code utilizes the power of database abstraction by employing SQLAlchemy, which allows seamless interaction with different database systems.",
// 					"The application leverages the Flask-Login extension for managing user sessions and authentication, simplifying the process of user management.",
// 				],
// 				techStack: [
// 					"Python",
// 					"Flask",
// 					"Flask-Login",
// 					"Flask-Bcrypt",
// 					"SQLAlchemy",
// 					"dotenv",
// 				],
// 			},
// 			{
// 				insights: [
// 					"The code follows the PEP8 coding conventions, such as using snake_case for variable and function names, and indentations for blocks of code.",
// 					"The code uses the SQLAlchemy ORM for object-relational mapping and database access. SQLAlchemy is a popular and versatile ORM that supports many different database backends.",
// 					"The code uses the Flask-Login extension to manage user authentication and sessions. Flask-Login is a lightweight extension that provides user authentication and session management features for Flask applications.",
// 				],
// 				techStack: ["Python", "Flask", "Flask-Login", "SQLAlchemy"],
// 			},
// 			{
// 				insights: [
// 					"The code demonstrates the extensive utilization of OpenAI's API to enhance the functionality of the PowerPoint presentations assistant.",
// 					"The inclusion of environment variable loading and handling ensures secure storage of sensitive information.",
// 					"The utilization of the OpenAI ChatCompletion service allows the assistant to converse with the user and generate creative suggestions for the PowerPoint presentation.",
// 				],
// 				techStack: ["Python", "OpenAI", "dotenv"],
// 			},
// 		],
// 	};
// };
