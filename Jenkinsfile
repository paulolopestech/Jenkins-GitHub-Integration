pipeline {
    agent any
    stages {
        stage('Stage') {
            steps {
                echo 'Pipeline'
                script {
                    sh 'node --version'
                    sh 'npm -v'
                    sh 'ls'
                    sh 'npm install'
                }
            }
        }

        // stage('Installing nodeJs dependencies') {
		// 	steps {
		// 		script {
        //         sh 'npm install --verbose'
		// 		}
		// 	}
		// }

        // stage('Unit Tests') {
		// 	steps {
		// 		script {
		// 		sh 'npm run test'
		// 		}
		// 	}
		// 	post {
		// 		always {
		// 		step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/coverage.xml', lineCoverageTargets: '95, 95, 50'])
		// 		}
		// 	}
		// }

        // stage("killing old container") {
		// 	steps {
		// 		sh 'docker stop library || true && docker rm library || true && docker rmi library || true'
		// 	}
		// }

		// stage("build") {
		// 	steps {
		// 		sh 'docker build -t library .'
		// 	}
		// }

        // stage("run") {
		// 	steps {
		// 		sh 'docker compose up -d --build'
		// 	}
		// }
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