import * as fs from 'node:fs';
import { readFileSync, writeFileSync } from 'fs';
import xmlbuilder from 'xmlbuilder';
import xml2js from 'xml2js';
import yaml from 'js-yaml';
import readline from 'readline';


let cidades_json = fs.readFileSync('./data/cidades-2.json');


let cidades_obj = JSON.parse(cidades_json);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Escolha uma opção:');
console.log('1. Gerar arquivos');
console.log('2. Carregar arquivos');

rl.question('Digite o número da opção desejada: ', (option) => {
  if (option === '1') {
    console.log('Escolha o formato de arquivo para gerar:');
    console.log('1. HTML');
    console.log('2. CSV');
    console.log('3. XML');
    console.log('4. JSON');

    rl.question('Digite o número da opção desejada: ', (formatOption) => {
      if (formatOption === '1') {
        let htmlString = `<!DOCTYPE HTML>
        <html>
          <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <title>Relatório de Nomes de Cidades</title>
          </head>
          <body>
            <h1>Relatório de Nomes de Cidades</h1>
            <ul>
        `;

        for (let i = 0; i < cidades_obj.length; i++) {
          htmlString += `     <li>${cidades_obj[i]['Nome']}</li>\n`;
        }


        htmlString += `    </ul>
          </body>
        </html>`;


        console.log(htmlString);

      } else if (formatOption === '2') {

        let csvString = 'Nome da Cidade\n';


        for (let i = 0; i < cidades_obj.length; i++) {
          csvString += `${cidades_obj[i]['Nome']}\n`;
        }


        fs.writeFileSync('./data/rel_cidades.csv', csvString);

        console.log('Relatório de Nomes de Cidades gerado em formato CSV (rel_cidades.csv).');
      } else if (formatOption === '3') {

        const root = xmlbuilder.create('RelatorioCidades');
        const cidades = root.ele('Cidades');


        for (let i = 0; i < cidades_obj.length; i++) {
          cidades.ele('Cidade', cidades_obj[i]['Nome']);
        }


        const xmlString = root.end({ pretty: true });


        writeFileSync('./data/rel_cidades.xml', xmlString, 'utf8');

        console.log('Relatório de Nomes de Cidades gerado em formato XML (rel_cidades.xml).');
      } else if (formatOption === '4') {
        const relatorioJSON = {
          RelatorioCidades: {
            Cidades: cidades_obj.map(cidade => ({ Nome: cidade['Nome'] }))
          }
        };

        
        const jsonString = JSON.stringify(relatorioJSON, null, 2);

        
        fs.writeFileSync('./data/rel_cidades.json', jsonString);

        console.log('Relatório de Nomes de Cidades gerado em formato JSON (rel_cidades.json).');
      } else {
        console.log('Opção inválida.');
      }

      rl.close();
    });

  } else if (option === '2') {
    console.log('Escolha o formato de arquivo para carregar:');
    console.log('1. XML');
    console.log('2. CSV');
    console.log('3. YAML');
    console.log('4. HTML');

    rl.question('Digite o número da opção desejada: ', (formatOption) => {
      if (formatOption === '1') {
        function loadXMLData(filename) {
          try {
            const data = fs.readFileSync(filename, 'utf8');
            xml2js.parseString(data, { explicitArray: false, trim: true }, (error, result) => {
              if (error) {
                console.error('Erro ao carregar dados XML:', error);
              } else {
                console.log('Dados carregados do arquivo XML:', result);
              }
            });
          } catch (error) {
            console.error('Erro ao ler o arquivo XML:', error);
          }
        }
        
        const xmlData = loadXMLData('./data/rel_cidadesxml.xml');
        if (xmlData) {
          console.log('Dados carregados do arquivo XML:', xmlData);
        }
      } else if (formatOption === '2') {
        function loadCSVData(filename) {
          try {
            const data = fs.readFileSync(filename, 'utf8');
            return data.split('\n').filter(line => line.trim() !== '');
          } catch (error) {
            console.error('Erro ao carregar dados CSV:', error);
            return null;
          }
        }

        const csvData = loadCSVData('./data/rel_cidades.csv');
        if (csvData) {
          console.log('Dados carregados do arquivo CSV:', csvData);
        }
      } else if (formatOption === '3') {
        function loadYAMLData(filename) {
          try {
            const data = fs.readFileSync(filename, 'utf8');
            return yaml.load(data);
          } catch (error) {
            console.error('Erro ao carregar dados YAML:', error);
            return null;
          }
        }

        const yamlData = loadYAMLData('./data/rel_cidades.yaml');
        if (yamlData) {
          console.log('Dados carregados do arquivo YAML:', yamlData);
        }
      } else if (formatOption === '4') {
        function loadHTMLData(filename) {
          try {
            const data = fs.readFileSync(filename, 'utf8');
            return data;
          } catch (error) {
            console.error('Erro ao carregar dados HTML:', error);
            return null;
          }
        }

        const htmlData = loadHTMLData('./data/rel_cidades.html');
        if (htmlData) {
          console.log('Dados carregados do arquivo HTML:', htmlData);
        }
      } else {
        console.log('Opção inválida.');
      }

      rl.close();
    });
  } else {
    console.log('Opção inválida.');
    rl.close();
  }
});
