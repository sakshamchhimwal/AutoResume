import { Schema, model } from "mongoose";

const User = new Schema({
	username: { type: Schema.Types.String, unique: true },
	projects: {
		type: [
			{
				projectname: Schema.Types.String,
				projectdesc: [Schema.Types.String],
				skills: [Schema.Types.String]
			},
		],
		default: [],
	},
});

const userModel = model("user", User);
export default userModel;
