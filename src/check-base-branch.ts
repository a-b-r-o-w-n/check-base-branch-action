import * as core from "@actions/core";
import * as github from "@actions/github";

const getPR = () => {
  return github.context.payload.pull_request;
};

const getProtectedBranches = (): string[] => {
  const branches = core.getInput("protected-branches", { required: true });

  return branches.split(",").map((b) => b.trim());
};

async function run() {
  const pr = getPR();

  if (!pr) {
    core.debug("Could not get pull request from context. Skipping.");
    return;
  }

  try {
    const protectedBranches = getProtectedBranches();
    const updateBranch = core.getInput("update-branch");
    const defaultBranch = core.getInput("default-branch", {
      required: updateBranch !== "true",
    });
    const token = core.getInput("repo-token", {
      required: updateBranch !== "true",
    });

    core.debug(`Checking base branch for PR #${pr.number}`);

    if (protectedBranches.includes(pr.base.ref)) {
      if (updateBranch === "true") {
        core.debug(
          `Updating base branch '${pr.base.ref}' to '${defaultBranch}'.`
        );

        const oktokit = new github.GitHub(token);
        const payload = {
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          pull_number: pr.number,
        };

        await oktokit.pulls.update({
          ...payload,
          base: defaultBranch,
        });

        core.info(
          `Branch updated from '${pr.base.ref}' to '${defaultBranch}'.`
        );
      } else {
        core.setFailed(`Base branch set to protected branch '${pr.base.ref}'`);
        return;
      }
    } else {
      core.debug(`Base branch is ${pr.base.ref}. Skipping.`);
    }
  } catch (err) {
    core.error(err);
    core.setFailed(
      `Error occurred while validating base branch: ${err.message}`
    );
  }
}

run();
