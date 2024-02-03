import express from "express";
import { analyseRepo } from "../services/analyseRepo.js";
import userModel from "../models/user.js";
import { getGitHubDetails } from "../utils/getGithubDetails.js";
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
	const { token } = req.body;
	const userDetails = await getGitHubDetails(token);
	const { username } = userDetails;
	const newUser = await userModel.create({ username: username });
	if (newUser) {
		return res.send({ message: "New user created successfuly" });
	}
	return res.send({ message: "New user not created" });
});

router.post("/analyse", async (req, res, next) => {
	const { token, repoURL1, repoURL2, repoURL3 } = req.body;
	const userDetails = await getGitHubDetails(token);
	const { username } = userDetails;
	const userExist = await doesUserExist(username);
	if (!userExist) {
		return res.send({ message: "user does not exist" }).status(403);
	}
	const urls = [repoURL1, repoURL2, repoURL3];
	for (const url in urls) {
		const split = url.split("/");
		const repoName = split[4];
		const repoAnalysis = await analyseRepo(token, url);
		const update = await userModel.findOneAndUpdate(
			{ username: username },
			{
				$push: {
					projects: {
						projectname: repoName,
						projectdesc: repoAnalysis,
					},
				},
			}
		);
		if (update.isModified()) {
			return res.send(update.projects).status(200);
		}
		return res.send({ message: "Some issue occures" }).status(500);
	}
});

router.get("/test", async (req, res, next) => {
	const analysedReadme = await analyseRepo(
		process.env.GITHUB_PAN,
		"https://github.com/otahina/PowerPoint-Generator-Python-Project"
	);
	return res.send(analysedReadme);
});

export default router;
