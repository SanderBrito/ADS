# ES46A_Exercicio1

Arquitetura em Camadas

Neste repositório se encontra um sistema simples de média ponderada.

As camadas podem ser definidas de diversas maneiras: 
UI (GUI, Java Swing, XML)              
    |                                           
Negócio                                    
    |                                           
Dados (JSON, CSV)                        



UI (HTML, GUI Java Applets e Servlets) -> Comunicação(Java RMI) -> Negócio -> Dados (Java JDBC)

Maiores detalhes na explicação em aula!
									   
Acrescentar uma página inicial com duas navegações (cálculo de médias, exibir lista)
Acrescentar uma camada de persistência que guarda as médias calculadas. 
Exibir as médias calculadas em uma nova página (lista)