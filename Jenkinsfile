pipeline {
    agent any
    options {
        skipDefaultCheckout true
    }

    stages {
        stage('Clone Repository') {
            steps {
                sh 'echo clonning repo asdadsa'
            }
        }

        stage('Build') {
            steps {
                sh 'echo build'
            }
        }

        stage('Test') {
            steps {
                sh 'echo test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo deploy'
            }
        }
    }

    post {
        always {
            githubStatus context: 'continuous-integration/jenkins', state: 'success'
            if (env.CHANGE_ID) {
                githubComment message: "The pipeline completed successfully!"
                githubLabel labels: ['approved']
            }
        }
    }
}