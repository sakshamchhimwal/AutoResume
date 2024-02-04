import axios from "axios";

export const getGitHubDetails = async (auth) => {
  try {
    const res = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
