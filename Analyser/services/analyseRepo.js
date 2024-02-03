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
		resStr = resStr + atob(ele);
	});
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
	const tech = await AnalyseFiles(fileAnalysis);
	const techStack = [];
	await Promise.all(
		fileAnalysis.forEach(async (ele) => {
			const res = await AnalyseFiles(ele);
			techStack.push(res);
		})
	);
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
	const readMeAnalysis = await getReadMeCrux(auth, readMeURL);
	const repoLangs = await getRepoLanguages(auth, username, repoName);
	const techStack = await getTechStack(auth, allFiles);
	console.log({ readMeAnalysis, repoLangs, techStack });
	return;
};
