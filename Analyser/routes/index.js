import express from "express";
import { analyseRepo } from "../services/analyseRepo.js";
import userModel from "../models/user.js";
import { getGitHubDetails } from "../utils/getGithubDetails.js";
import { generateResume } from "../analysers/build.resume.js";
import { writeFile } from "fs";
import { replaceEle } from "../resumes/resume1/template.js";
import { exec } from "node:child_process";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { log } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    const newUser = await userModel.create({
      username: login,
      name: req.body.name,
      address: req.body.name,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      emailAddress: req.body.email,
      collegeName: req.body.email,
      year: req.body.year,
      degree: req.body.year,
    });
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
  try {
    for (const url of urls) {
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
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Error in parsing" });
  }
  return res.send({ message: updates.toString() });
});

router.post("/build", async (req, res, next) => {
  const { JD, token } = req.body;
  log(token);
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
    try {
      currResume = JSON.parse(
        currResume.replaceAll("`", "").replaceAll("json", "")
      );
      resume.push({
        title: projectname,
        technologies: currResume.skills,
        points: currResume.projectDetails,
      });
    } catch (err) {
      log(err);
      return res.status(500).send({ message: "Error in parsing" });
    }
  }
  console.log(resume);
  return res.send({ projects: resume }).status(200);
});

router.post("/make", async (req, res, next) => {
  const { updatedData, token } = req.body;
  const { login } = await getGitHubDetails(token);
  console.log(login);
  const getAllDetails = await userModel.findOne({ username: login });
  const replacement = {
    name: getAllDetails.name,
    address: getAllDetails.address,
    mobileNumber: getAllDetails.mobileNumber,
    email: getAllDetails.emailAddress,
    collegeName: getAllDetails.collegeName,
    year: getAllDetails.year,
    degree: getAllDetails.degree,
    projects: updatedData,
  };
  console.log(replacement.projects.projects[0]);
  const op = replaceEle(
    replacement.name,
    replacement.address,
    replacement.mobileNumber,
    replacement.email,
    replacement.collegeName,
    replacement.year,
    replacement.degree,
    replacement.projects.projects[0].title,
    "",
    replacement.projects.projects[0].technologies.toString(),
    replacement.projects.projects[0].points
      .map((ele) => {
        return `\\item ${ele}`;
      })
      .toString(),
    replacement.projects.projects[1].title,
    "",
    replacement.projects.projects[1].technologies.toString(),
    replacement.projects.projects[1].points
      .map((ele) => {
        return `\\item ${ele}`;
      })
      .toString(),
    replacement.projects.projects[2].title,
    "",
    replacement.projects.projects[2].technologies.toString(),
    replacement.projects.projects[2].points
      .map((ele) => {
        return `\\item ${ele}`;
      })
      .toString()
  );
  const strData = op.toString();
  writeFile("./resumes/resume1/temp.tex", strData, (err) => {
    if (err) {
      throw err;
    }
    console.log("Data has been written to file successfully.");
    res.download("./resumes/resume1/temp.tex");
  });
});

router.get("/test", async (req, res, next) => {
  const analysedReadme = await analyseRepo(
    process.env.GITHUB_PAN,
    "https://github.com/otahina/PowerPoint-Generator-Python-Project"
  );
  return res.send(analysedReadme);
});

export default router;
