import * as core from "@actions/core";
import * as github from "@actions/github";

const getPRNumber = (): number | undefined => {
  const pr = github.context.payload.pull_request;

  if (pr) {
    return pr.number;
  }
};

async function run() {
  const prNumber = getPRNumber();

  if (!prNumber) {
    core.debug("Could not get pull request number from context. Skipping.");
    return;
  }

  const token = core.getInput("repo-token", { required: true });
  const protectedBranches = core.getInput("protected-branches", { required: true });
  const updateBranch = core.getInput("update-branch");
  const defaultBranch = core.getInput("default-branch", { required: updateBranch !== 'true' });

  const oktokit = new github.GitHub(token);

  try {
    core.debug(`Checking base branch for PR #${prNumber}`);

    const payload = {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prNumber
    };

    const pr = await oktokit.pulls.get({
      ...payload
    });

    if (protectedBranches.includes(pr.data.base.ref)) {
      if (updateBranch === 'true') {
        core.info(`updateBranch set to true. Updating base branch '${pr.data.base.ref}' to '${defaultBranch}'.`);

        await oktokit.pulls.update({
          ...payload,
          base: "master"
        });
      } else {
        core.setFailed(`Base branch set to protected branch '${pr.data.base.ref}'`);
        return;
      }
    } else {
      core.debug(`Base branch is ${pr.data.base.ref}. Skipping.`);
    }
  } catch (err) {
    core.error(err);
    core.setFailed(
      `Error occurred while validating base branch: ${err.message}`
    );
  }
}

run();
