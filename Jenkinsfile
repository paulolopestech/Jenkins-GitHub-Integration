pipeline {
    agent any
    options {
        skipDefaultCheckout true
    }

    stages {
        stage('Clone Repository') {
            steps {
                sh 'echo clonning repository'
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
            githubComment message: "The pipeline completed successfully!"
            githubLabel labels: ['approved']
        }
    }
}