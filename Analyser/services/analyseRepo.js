import axios from "axios";
import { config } from "dotenv";
config();
import { Octokit, App } from "octokit";
import analyseReadme from "../analysers/readme.analyser.js";

const files = new Set(["requirements.txt", "package.json"]);

const getTechStack = async (auth, fileURL) => {};

export const getReadMeCrux = async (auth, fileURL) => {
	const getReadMeDets = await axios.get(fileURL, {
		headers: {
			Authorization: `Bearer ${auth}`,
		},
	});

	const contents = getReadMeDets.data.content.split("\n");
	let resStr = "";
	contents.forEach((ele) => {
		resStr = resStr + atob(ele);
	});
    console.log(resStr);
	return analyseReadme(resStr);
};

const getRepoLanguages = async (auth, username, repoName) => {
	const res = await axios.get(
		`https://api.github.com/repos/${username}/${repoName}/languages`,
		{
			Authorization: `Bearer ${auth}`,
		}
	);
	const languages = res.data;
	return languages;
};

const getAllFiles = async (auth, username, repoName) => {
	const res = await axios.get(
		`https://api.github.com/repos/${username}/${repoName}/git/trees/master?recursive=1`,
		{
			headers: {
				Authorization: `Bearer ${auth}`,
			},
		}
	);
	const allFiles = [];
	files.forEach((ele) => {
		if (ele.path.includes("readme") || ele.path.includes("README")) {
			getReadMeCrux(auth, ele.url);
		} else {
			allFiles.push({ path: ele.path, url: ele.url });
		}
	});
};

export const analyseRepo = async (auth, repoURL) => {};
