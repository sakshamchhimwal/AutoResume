import { Schema, model } from "mongoose";

const User = new Schema({
	username: Schema.Types.String,
	firstname: Schema.Types.String,
	skills: { type: [Schema.Types.String], default: [] },
	projects: {
		type: [
			{
				projectname: Schema.Types.String,
				projectdesc: [Schema.Types.String],
			},
		],
		default: [],
	},
});

const userModel = model("user", User);
export default userModel;
