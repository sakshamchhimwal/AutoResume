import { Schema, model } from "mongoose";

const User = new Schema({
	username: { type: Schema.Types.String, unique: true },
	name:Schema.Types.String,
	address:Schema.Types.String,
	mobileNumber:Schema.Types.String,
	emailAddress:Schema.Types.String,
	collegeName:Schema.Types.String,
	year:Schema.Types.String,
	degree:Schema.Types.String,
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
