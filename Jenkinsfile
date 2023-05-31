pipeline {
    agent any

    stages {
        stage('TEST PIPELINE') {
            steps {
                sh "echo pipeline"
            }
        }
    }

    post{
        success{
            setBuildStatus("Build succeeded", "SUCCESS");
            // echo success
        }

        failure {
            setBuildStatus("Build failed", "FAILURE");
            // echo failure
        } 
    }
}

void setBuildStatus(String message, String state) {
    step([
        $class: "GitHubCommitStatusSetter",
        contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
        errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
        statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
    ]);
}

// just to commit inf + inf + inf + inf ++ +++ ++
// curl "https://api.github.com/repos/[organization name]/[repo name]/statuses/[commit id]?access_token=[GitHub access token]" -H "Content-Type: application/json"   -X POST -d "{\"state\": \"success\", \"description\": \"Build Successful \", \"target_url\": \"[jenkins job url]\", \"context\": \"[Job name]\" }"


// GenericWebhook Trigger 
// GitHub PlugIn
// githubtoken 113f86edf432597ac960eb895401c248dc


        //   --data action=${{ env.GITHUB_EVENT_ACTION }} \
        //   --data pr_id=${{ env.GITHUB_EVENT__PR_ID }} \
        //   --data pr_state=${{ env.GITHUB_EVENT__PR_STATE }} \
        //   --data pr_title=${{ env.GITHUB_EVENT__PR_TITLE }} \
        //   --data pr_from_ref=${{ env.GITHUB_EVENT__PR_REF }} \
        //   --data pr_from_sha=${{ env.GITHUB_EVENT_PR_SHA }} \
        //   --data pr_from_git_url=${{ env.GITHUB_EVENT__PR__FROM_GIT_URL }} \
        //   --data pr_to_ref=${{ env.GITHUB_EVENT__PR__TO_REF }} \
        //   --data pr_to_git_url=${{ env.GITHUB_EVENT__PR__TO_GIT_URL }} \
        //   --data pr_to_sha=${{ env.GITHUB_EVENT__PR__TO_SHA }} \
        //   --data repo_git_url=${{ env.GITHUB_EVENT_REPOSITORY_URL }} \
        //   -X POST http://ec2-52-67-42-6.sa-east-1.compute.amazonaws.com:8080/job/CICDTeste/buildWithParameters --user GitHub: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
    