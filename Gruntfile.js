//Install npm init
//Install npm i --save-dev grunt
//Install npm i --save-dev grunt-contrib-less  Esse plugin é usado para fazer a compilação do less.
//Install npm i --save-dev grunt-contrib-sass  Esse plugin é usado para fazer a compilação do sass.
//Install npm i --save-dev grunt-concurrent    Esse plugin é usado para executar tarefas simultaneamente ou seja, serve pra execultar todas as tarefas ao mesmo tempo.
//Install npm i --save-dev grunt-replace       Esse plugin é usado para fazer a "copia" do Html, uma para o Desenvolvedor e a outra para o Produtor.
//Install npm i --save-dev grunt-contrib-htmlmin  Esse plugin é usado para fazer a minificalçao do arquivo html.
//install npm i --save-dev grunt-contrib-clean Esse plugin é usado para apagar pastas temporarias ou arquivos depois da execução do grunt.
//Install npm i --save-dev grunt-contrib-uglify  Esse plugin é usado para comprimir o JS


//Forma de registrar uma tarefa
/*
    grunt.registerTask('NomeDaTarefa', function(){
        conteudo da Tarefa.
    })
*/

module.exports = function(grunt) {         //Function para iniciarmos o Grunt.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {                             //Function para onde os arquivos do less vao para ser compilados.
            development: {                  //O uso desse "parametro" foi pelo fato desses arquivos estarem sendo feito no Ambiente de desenvolvimento em uma maquina local mas não é a unica configuração que temos para essa function.
                files: {
                    'dev/styles/main.css' : 'src/styles/main.less'
                }
            },
            production: {                   //Essa function é o ambiente de produção do site onde faremos a compreção dos arquivos Css para deixa-lo mimificados.
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less'    //O arquivo de Mimificação tera que ser diferente do arquivo Css normal pois sao arquivos diferentes porem o arquivo de Origem o Main.less ainda sim é o mesmo.
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {                          //Compilação do Html pela configuração de desenvolvimento.
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
        /*sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'main-sass.css' : 'main.scss'
                }
            }
        },
        concurrent: {
            target: ['olaGrunt', 'less', 'sass']
        }*/
    })

    grunt.registerTask('olaGrunt', function() {
        const done =  this.async();     //Essa variavel determina quando o conteudo da function esta pronto para ser execultada.
        setTimeout(function() {     //O setTimeOut serve pra da um atraso no conteudo da function.
            console.log('ola grunt');
            done();
        }, 3000)
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //Forma de inicializarmos o plugin do Less dentro do grunt
    //grunt.loadNpmTasks('grunt-contrib-sass'); //Forma de inicializarmos o plugin do Sass dentro do grunt
    //grunt.loadNpmTasks('grunt-concurrent');   //Forma de inicializarmos o plugin para fazer as tarefas serem execultadas ao mesmo tempo.
    grunt.loadNpmTasks('grunt-contrib-watch');  //Forma de inicializarmos o plugin para fazer a função de watch.
    grunt.loadNpmTasks('grunt-replace')         //Forma de inicializarmos a comprimição do Html
    grunt.loadNpmTasks('grunt-contrib-htmlmin') //Forma de inicializarmos o plugin de minificação do Html
    grunt.loadNpmTasks('grunt-contrib-clean')   //Forma de inicializarmos o plugin para apagar uma pasta temporaria ou um arquivo.
    grunt.loadNpmTasks('grunt-contrib-uglify')  //Forma de inicializarmos o plugin para fazer a compresão do JS


    grunt.registerTask('default', ['watch']); //Essa é a function que sera execultada quando usarmos o "npm run grunt", no lugar da function colocamos uma Array para conter todos os nome das tarefas para serem execultadas ao mesmo tempo.
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify'])     //Esse Tarefa é reponsavel pera execução dos arquivos que irao para a pasta "Dist", Separamos o grunt em duas partes a de Desenvolvedor que é uma pasta que so os desenvolvedores terao acesso. E a segunda parte é responsavel pela pasta de Dist que é os arquivos que a vercel ira ler para publica o site.
}