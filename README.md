# GitHub and Jenkins Integration
<br />

![Jenkins](https://img.shields.io/badge/Jenkins-D33833?style=for-the-badge&logo=jenkins&logoColor=white
)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
)

<br />

## Resumo

> Este repositório contém um workflow para integração dinâmica entre o GitHub e o Jenkins, com opções de acesso a redes privadas configurando o acesso dinâmicamente através de um IAM na AWS ou um arquivo de VPN, permitindo que o GitHub dispare triggers para pipelines no Jenkins. Conta também com uma função no Jenkinsfile para atualização do status de pull request no GitHub

## Configuração do Jenkins

- Adicione o Plugin do GitHub ao Jenkins: [GitHub PlugIn](https://plugins.jenkins.io/github/)
- Configure a verificação de chave do Host do Git
  - Acesse as configurações de segurança global do Jenkins
  - Configure a opção <b>"Git Host Key Verification Configuration"</b> para <b>"Know hosts file"</b>

- Adicione um token o GitHub (GitHub Personal Access Token)
  - Crie um Personal Access Token no GitHub: [GitHub Generate New Token](https://github.com/settings/tokens/new)
  - Escolha o escopo do Token, de modo que permita realizar alterações nos commits e/ou pull requests do repositório
  -  Vá até as configurações do Jenkins e, na aba GitHub, crie um GitHub Server e adicione o Token criado nas credenciais com o tipo secret text
  -  Desmarque a opção “Manage Hooks” e Salve

- Crie uma chave SSH, adicione a chave pública ao github e a chave privada as credenciais do Jenkins

- Crie um projeto Pipeline no Jenkins
  - acesse as configurações do Pipeline
  - adicione o repositório do GitHub e a chave SSH nas configurações da pipeline
  - Especifique a branch desejada para realizar o pipeline
  - Insira o URL do repositório e clique em “Validate” para validar a conexão
  - 
