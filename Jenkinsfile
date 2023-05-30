pipeline {
    agent any

    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'action', value: '$.action', expressionType: 'JSONPath'],
                [key: 'pr_id', value: '$.pr_id', expressionType: 'JSONPath'],
                [key: 'pr_state', value: '$.pr_state', expressionType: 'JSONPath'],
                [key: 'pr_title', value: '$.pr_title', expressionType: 'JSONPath'],
                [key: 'pr_from_ref', value: '$.pr_from_ref', expressionType: 'JSONPath'],
                [key: 'pr_from_sha', value: '$.pr_from_sha', expressionType: 'JSONPath'],
                [key: 'pr_from_git_url', value: '$.pr_from_git_url', expressionType: 'JSONPath'],
                [key: 'pr_to_ref', value: '$.pr_to_ref', expressionType: 'JSONPath'],
                [key: 'pr_to_git_url', value: '$.pr_to_git_url', expressionType: 'JSONPath'],
                [key: 'pr_to_sha', value: '$.pr_to_sha', expressionType: 'JSONPath'],
                [key: 'repo_git_url', value: '$.repo_git_url', expressionType: 'JSONPath'],
            ],
        )
    }

    stages {
        stage('TEST PIPELINE') {
            steps {
                sh "echo $action"
                sh "echo $pr_id"
                sh "echo $pr_state"
                sh "echo $pr_title"
                sh "echo $pr_from_ref"
                sh "echo $pr_from_sha"
                sh "echo $pr_from_git_url"
                sh "echo $pr_to_ref"
                sh "echo $pr_to_git_url"
                sh "echo $pr_to_sha"
                sh "echo $repo_git_url"
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

// just to commit inf + inf + inf + inf ++ +++
// curl "https://api.github.com/repos/[organization name]/[repo name]/statuses/[commit id]?access_token=[GitHub access token]" -H "Content-Type: application/json"   -X POST -d "{\"state\": \"success\", \"description\": \"Build Successful \", \"target_url\": \"[jenkins job url]\", \"context\": \"[Job name]\" }"


// GenericWebhook Trigger
// GitHub PlugIn
// 