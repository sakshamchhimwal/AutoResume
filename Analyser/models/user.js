import { Schema, model } from "mongoose";

const User = new Schema({
	username: Schema.Types.String,
	skills: [Schema.Types.String],
	projects: [
		{
			projectname: Schema.Types.String,
			projectdesc: [Schema.Types.String],
		},
	],
});

const userModel = model("user", User);
export default userModel;
