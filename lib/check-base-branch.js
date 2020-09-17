"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const getPRNumber = () => {
    const pr = github.context.payload.pull_request;
    if (pr) {
        return pr.number;
    }
};
const getProtectedBranches = () => {
    const branches = core.getInput("protected-branches", { required: true });
    return branches.split(',').map(b => b.trim());
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const prNumber = getPRNumber();
        if (!prNumber) {
            core.debug("Could not get pull request number from context. Skipping.");
            return;
        }
        try {
            const token = core.getInput("repo-token", { required: true });
            const protectedBranches = getProtectedBranches();
            const updateBranch = core.getInput("update-branch");
            const defaultBranch = core.getInput("default-branch", { required: updateBranch !== 'true' });
            const oktokit = new github.GitHub(token);
            core.debug(`Checking base branch for PR #${prNumber}`);
            const payload = {
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                pull_number: prNumber
            };
            const pr = yield oktokit.pulls.get(Object.assign({}, payload));
            if (protectedBranches.includes(pr.data.base.ref)) {
                if (updateBranch === 'true') {
                    core.debug(`Updating base branch '${pr.data.base.ref}' to '${defaultBranch}'.`);
                    yield oktokit.pulls.update(Object.assign(Object.assign({}, payload), { base: defaultBranch }));
                    core.info(`Branch updated from '${pr.data.base.ref}' to '${defaultBranch}'.`);
                }
                else {
                    core.setFailed(`Base branch set to protected branch '${pr.data.base.ref}'`);
                    return;
                }
            }
            else {
                core.debug(`Base branch is ${pr.data.base.ref}. Skipping.`);
            }
        }
        catch (err) {
            core.error(err);
            core.setFailed(`Error occurred while validating base branch: ${err.message}`);
        }
    });
}
run();
