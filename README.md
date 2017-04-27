# JMeter Node App - Usando TDD

Aplicativo baseado nos recursos do JMeter para Testes de Carga e Desempenho. Para este projeto, tive dois objetivos: Desenvolver um aplicativo simples que usa recursos (limitados) semelhantes ao do JMeter. Os recursos desenvolvidos foram: HTTPCookieManager, HTTPRequest, RegularExpressionExtractor e ThreadGroup.

O site utilizado para fazer teste de segurança, carga e desempenho foi o Redmine.org (site exclusivamente feito para testes). A parte do sistema que diz respeito ao JMeter foi separado numa pasta "jmeter" e a classe principal de grupo de usuários (ThreadGroupRedmine.ts) está na pasta "thread".

Foi necessário criar também um usuário e uma classe de Client para ser usado no processo (ver mais no git).

Para executar os testes na aplicação, foi utilizado o [Mocha](https://mochajs.org/).


## Executar o Aplicativo
Digite o seguinte comando no terminal:
	
```bash
npm start
```

Árvore de Processos:

![alt text](https://github.com/Wpdas/JMeter-Node-using-TDD/blob/master/imgs/JMeter%20Node%20(TypeScript).png?raw=true)

## Executar Testes (Mocha)
Digite o seguinte comando no terminal para executar os testes no aplicativo.
	
```bash
npm test
```

Resultado esperado:

![alt text](https://github.com/Wpdas/JMeter-Node-using-TDD/blob/master/imgs/TDD%20Test.png?raw=true)
