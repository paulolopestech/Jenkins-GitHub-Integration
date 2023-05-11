// properties([pipelineTriggers([gitHubPush()])])

// node {
//     git url: '', branch: 'main'
//     step([$class: 'GitHubCommitStatusSetter', contextSource: [$class: 'ManualyEnteredCommitContextSource', context: 'pipeline update'], statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message:'Building Pipeline Job', state: 'SUCCESS']]]])
// }

void initialize() {
    echo 'Initializing PipelineSteps.'
}

pipeline {
    agent any
    stages {
        stage('Stage') {
            steps {
                echo 'Pipeline'
            }
        }
    }
}