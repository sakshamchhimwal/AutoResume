import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/analyse", (req, res, next) => {
	const { token, repoURL1, repoURL2, repoURL3 } = req.body;
  
});

export default router;
