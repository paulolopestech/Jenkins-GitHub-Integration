pipeline {
    agent any

    stages {
        stage('hello') {
            steps {
                sh 'echo Hello Jenkins!'
            }
        }
        
        stage ('Build Image') {
            steps {
                script {
                    dockerapp = docker.build("paulolopestech/api:${env.BUILD_ID}", '-f ./Dockerfile ./') { // construction of docker image
                        // envia imagem para dockerhub
                        dockerapp.push('latest')
                        dockerapp.push("${env.BUILD_ID}")
                    }

                }
            }
        }
    }
}