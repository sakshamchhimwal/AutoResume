import express from "express";
import { analyseRepo } from "../services/analyseRepo.js";
import userModel from "../models/user.js";
import { getGitHubDetails } from "../utils/getGithubDetails.js";
import { generateResume } from "../analysers/build.resume.js";
const router = express.Router();

const doesUserExist = async (userName) => {
	const user = await userModel.findOne({ username: userName });
	if (user) {
		return true;
	} else {
		return false;
	}
};

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/register", async (req, res, next) => {
	try {
		const { token } = req.body;
		const userDetails = await getGitHubDetails(token);
		const { login } = userDetails;
		console.log(login);
		const newUser = await userModel.create({ username: login });
		if (newUser) {
			return res.send({ message: "New user created successfuly" });
		}
		return res.send({ message: "New user not created" });
	} catch (err) {
		console.log(err);
		return res.send({ message: "New user not created" });
	}
});

router.post("/analyse", async (req, res, next) => {
	const { token, repoURL1, repoURL2, repoURL3 } = req.body;
	const userDetails = await getGitHubDetails(token);
	const { login } = userDetails;
	const userExist = await doesUserExist(login);
	if (!userExist) {
		return res.send({ message: "user does not exist" }).status(403);
	}
	const urls = [repoURL1, repoURL2, repoURL3];
	const updates = [];
	for (const url of urls) {
		try {
			const splitURL = url.split("/");
			const repoName = splitURL[4];
			const repoAnalysis = await analyseRepo(token, url);
			const skills = [];
			const projInsights = [];
			repoAnalysis.readMeAnalysis.skills.forEach((ele) => {
				skills.push(ele);
			});
			repoAnalysis.techStack.forEach((ele) => {
				console.log(ele);
				ele?.techStack?.forEach((ele) => {
					skills.push(ele);
				});
			});
			repoAnalysis.readMeAnalysis.features.forEach((ele) => {
				projInsights.push(ele);
			});
			repoAnalysis.techStack.forEach((ele) => {
				ele?.insights?.forEach((ins) => {
					projInsights.push(ins);
				});
			});
			console.log({ repoName, skills, projInsights });
			const update = await userModel.findOneAndUpdate(
				{ username: login },
				{
					$push: {
						projects: {
							skills: skills,
							projectname: repoName,
							projectdesc: projInsights,
						},
					},
				}
			);
			updates.push(update);
		} catch (err) {
			console.log(err);
			res.send({ message: "Error in parsing" });
		}
	}
	res.send({ message: updates.toString() });
});

router.post("/build", async (req, res, next) => {
	const { JD, token } = req.body;
	const { login } = await getGitHubDetails(token);
	const userDets = await userModel.findOne({ username: login });
	const allProjects = userDets.projects;
	const resume = [];
	for (const proj of allProjects) {
		const { projectname, projectdesc, skills } = proj;
		let currResume = await generateResume(
			JD,
			projectdesc.toString(),
			skills.toString()
		);
		currResume = JSON.parse(currResume.replaceAll("`", "").replaceAll("json", ""));
		resume.push({
			projectname,
			currResume,
		});
	}
	console.log(resume);
	return res.send({ Resume: resume }).status(200);
});

router.get("/test", async (req, res, next) => {
	const analysedReadme = await analyseRepo(
		process.env.GITHUB_PAN,
		"https://github.com/otahina/PowerPoint-Generator-Python-Project"
	);
	return res.send(analysedReadme);
});

export default router;
