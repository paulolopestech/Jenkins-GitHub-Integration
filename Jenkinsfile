// properties([pipelineTriggers([gitHubPush()])])

// node {
//     git url: '', branch: 'main'
//     step([$class: 'GitHubCommitStatusSetter', contextSource: [$class: 'ManualyEnteredCommitContextSource', context: 'pipeline update'], statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message:'Building Pipeline Job', state: 'SUCCESS']]]])
// }

// void initialize() {
//     echo 'Initializing PipelineSteps.'
// }

// initialize()

pipeline {
    agent any
    stages {
        stage('Stage') {
            steps {
                echo 'Pipeline'
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

void setBuildStatus(String message, String state) {
    step([
        $class: "GitHubCommitStatusSetter",
        reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/paulolopestech/CI-CD"],
        contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
        errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
        statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
    ]);
}