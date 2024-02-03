import express from "express";
import { analyseRepo } from "../services/analyseRepo.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/analyse", (req, res, next) => {
	const { token, repoURL1, repoURL2, repoURL3 } = req.body;
});

router.get("/test", async (req, res, next) => {
	const analysedReadme = await analyseRepo(
		process.env.GITHUB_PAN,
		"https://github.com/otahina/PowerPoint-Generator-Python-Project"
	);
  return res.send(analysedReadme)
});

export default router;
