pipeline {
    agent any
    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'ref', value: '$.ref'],
                [key: 'pr_id', value: '$.pull_request.id']
            ],
            regexpFilterText: '$ref $pr_id',
            regexpFilterExpression: 'refs/heads/' + BRANCH_NAME
        )
    }

    stages {
        stage('TEST PIPELINE') {
            steps {
                echo "prid $pr_id"
            }
        }
    }

    post{
        success{
            setBuildStatus("Build succeeded", "SUCCESS");
        }

        failure {
            setBuildStatus("Build failed", "FAILURE");
        } 
    }
}

// void setBuildStatus(String message, String state) {
//     step([
//         $class: "GitHubCommitStatusSetter",
//         reposSource: [${repo_git_url}, url: "https://github.com/paulolopestech/CI-CD"],
//         contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
//         errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
//         statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
//     ]);
// }