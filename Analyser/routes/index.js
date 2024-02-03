import express from "express";
import { getReadMeCrux } from "../services/analyseRepo.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/analyse", (req, res, next) => {
	const { token, repoURL1, repoURL2, repoURL3 } = req.body;
});

// router.get("/test", async (req, res, next) => {
// 	const analysedReadme = await getReadMeCrux(
// 		process.env.GITHUB_PAN,
// 		"https://api.github.com/repos/sameerkali/Indie_Gems_Portal/git/blobs/b8ef362def5cd40db19901684d510e2765309139"
// 	);
//   return res.send(analysedReadme)
// });

export default router;
