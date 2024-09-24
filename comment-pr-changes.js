const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const githubToken = process.env.GITHUB_TOKEN;
const prNumber = process.env.PR_NUMBER;
const repo = process.env.GITHUB_REPOSITORY;
const [owner, repoName] = repo.split("/");

async function getPullRequestFiles() {
  const url = `https://api.github.com/repos/${owner}/${repoName}/pulls/${prNumber}/files`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  return response.data;
}

async function commentOnPullRequest(body) {
  const url = `https://api.github.com/repos/${owner}/${repoName}/issues/${prNumber}/comments`;
  await axios.post(
    url,
    { body },
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  );
}

async function getReviewFromApi(changes) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "I want you to review the code changes which is in the format of github changes with prefix + (added line) and - (deleted line). The review rules are, 1. best practice code for typescript, 2. check type annotations and variable names, 3. check if any variable is unused, 4. check if functions are not memoized using useMemo or React.memo, 5. check if there is no unnecessary comment out code. Don't just review but also suggest changes based on these rules.\nIf there is suggestion, use github suggestion format: \n{ wrong code }\n{description of suggestion}\n```suggestion\n{only suggested code here}\n```. And last but not least don't respond with all the lines, just respond suggestions with the lines which ayou are suggesting a change for. Keep the review clean and summarized. \nThe changes are :\n" +
    changes;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return "Error in generating review" + process.env.GOOGLE_API_KEY;
  }
}

(async () => {
  try {
    const files = await getPullRequestFiles();
    for (const file of files) {
      const changes = `Changes in \`${file.filename}\`:\n\n\`\`\`${file.patch}\`\`\``;
      const review = await getReviewFromApi(changes);
      const body = `Review for changes in \`${file.filename}\`:\n\n${review}`;
      await commentOnPullRequest(body);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
