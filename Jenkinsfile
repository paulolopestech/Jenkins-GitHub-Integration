pipeline {
    agent any

    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'action', value: '$.action', expressionType: 'JSONPath'],
                [key: 'pr_id', value: '$.pull_request', expressionType: 'JSONPath'],
                [key: 'git_url', value: '$.repository.git_url', expressionType: 'JSONPath'],
                // [key: 'payload', value: '$'],
            ],
        )
    }

    // properties([
    //     pipelineTriggers([
    //         [$class: 'GenericTrigger',
    //         genericVariables: [
    //             // [key: 'pr_id', value: '$.pull_request.id'],
    //             // [key: 'pr_state', value: '$.pull_request.state'],
    //             // [key: 'pr_title', value: '$.pull_request.title'],
    //             // [key: 'pr_from_ref', value: '$.pull_request.head.ref'],
    //             // [key: 'pr_from_sha', value: '$.pull_request.head.sha'],
    //             // [key: 'pr_from_git_url', value: '$.pull_request.head.repo.git_url'],
    //             // [key: 'pr_to_ref', value: '$.pull_request.base.ref'],
    //             // [key: 'pr_to_sha', value: '$.pull_request.base.sha'],
    //             // [key: 'pr_to_git_url', value: '$.pull_request.base.repo.git_url'],
    //             // [key: 'repo_git_url', value: '$.repository.git_url'],
    //         ]            
    //         ]
    //     ])
    // ])


    // triggers {
    //     GenericTrigger(
    //         genericVariables: [
    //             [key: 'ref', value: '$.ref'],
    //             [key: 'pr_id', value: '$.pull_request.id']
    //         ],
    //         regexpFilterText: '$ref $pr_id',
    //     )
    // }

    stages {
        stage('TEST PIPELINE') {
            // environment {
            //     JSONGIT = readJSON text: $repository
            // }
            // echo payload
            steps {
                // sh 'echo ${payload}'
                sh "echo $action"
                sh "echo $pr_id"
                sh "echo $git_url"
                // script {
                //     def JSONGIT = readJSON text: $repository
                //     echo JSONGIT
                // }
                // sh "echo ${JSONGIT}"
                // echo $action
                // script {
                        // JSON_PAYLOAD.each { key, value ->
                        // echo "$key , $value"
                    // }
                // }
            }
        }
    }

    // post{
    //     success{
    //         // setBuildStatus("Build succeeded", "SUCCESS");
    //         echo success
    //     }

    //     failure {
    //         // setBuildStatus("Build failed", "FAILURE");
    //         echo failure
    //     } 
    // }
}

// void setBuildStatus(String message, String state) {
//     step([
//         $class: "GitHubCommitStatusSetter",
//         reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/paulolopestech/CI-CD"],
//         commitShaSource: [$class: "ManuallyEnteredShaSource", sha: $pr_from_sha],
//         contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
//         errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
//         statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
//     ]);
// }

// just to commit inf + inf + inf + inf ++