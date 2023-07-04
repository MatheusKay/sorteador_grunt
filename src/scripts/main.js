document.addEventListener('DOMContentLoaded', function() {                 //Essa função/comando é ultilizado quando queremos que as funções Js seja execultadas depois que todo o Html/Css e outros arquivos Js ja tiverem sidos execultados.
    document.getElementById('sorteador-numero').addEventListener('submit', function(e) {
        e.preventDefault();

        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);
        
        let numeroSorteado = Math.random() * numeroMaximo;
        numeroSorteado = Math.floor(numeroSorteado + 1)

        document.getElementById('numero-sorteado').innerHTML = numeroSorteado
        document.querySelector('.resultado').style.display = 'block';
    })
})
