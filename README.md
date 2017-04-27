# JMeter Node App - Usando TDD

Aplicativo baseado nos recursos do JMeter para Testes de Carga e Desempenho. Para este projeto, tive dois objetivo: Desenvolver um aplicativo simples que usa recursos (limitados) semelhantes ao do JMeter. Os recursos desenvolvidos foram: HTTPCookieManager, HTTPRequest, RegularExpressionExtractor e ThreadGroup.

O site utilizado para fazer teste de segurança, carga e desempenho foi o Redmine.org (site exclusivamente feito para testes). A parte do sistema que diz respeito ao JMeter foi separado numa pasta "jmeter" e a classe principal que diz respeito a ThreadGroup (ThreadGroupRedmine.ts) está na pasta "thread".

Foi necessário criar também um usuário e uma classe de Client para ser usado no processo.


## Executar o Aplicativo
Digite o seguinte comando no terminal:
	
```terminal
npm start
```

## Executar Testes (Mocha)
Digite o seguinte comando no terminal para executar os testes no aplicativo.
	
```terminal
npm test
```
