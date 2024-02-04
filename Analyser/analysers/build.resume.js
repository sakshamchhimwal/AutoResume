import { config } from "dotenv";
config();
import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
	temperature: 0.9,
	topK: 1,
	topP: 1,
	maxOutputTokens: 2048,
};

const safetySettings = [
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
];

export async function generateResume(JD, PD, Skill) {
	const parts = [
		{
			text: `You are a student looking desperataly for a job. The recruiter will accept your resume only if it aligns with the company\'s job profile. \nYou are given the job description here:\n${JD} \t\nHere is the project details\n${PD}\nHere are the skills used in this project\n${Skill}\n\nAnalyse the Job Description provided by the recruiter. Use Project Details and the Skill of the user to make **3** points that showcase the skills and project and also the alignment of the project to the job description.\n\nStrictly use only the data provided do not come up with assumptions of your own. Limit the number of skills to **5** list the skills in descending order of importance in the Job Description.  Also provide at most **3** project description points. Make sure that they are in first person and showcasing the work that the user has done. Make sure to align it to the job description. Make sure that the line should be like "I built X using Y that affected Z"\n\nProvide the output as JSON, keep the backticks(\`). Striclty follow this Output Format\n\`\`\`json{\n\t"skills":[skill1, skill2, skill3, skill4, skill5] # Limit these to atleast 3 and atmost 5.\n\t"projectDetails" : [detail1, detail2, detail3] # The details must be in first person, showcasing the use and alignment of the project to the Job Description\n}\`\`\` `,
		},
	];

	const result = await model.generateContent({
		contents: [{ role: "user", parts }],
		generationConfig,
		safetySettings,
	});

	const response = result.response;
	console.log(response.text());
	return response.text();
}

