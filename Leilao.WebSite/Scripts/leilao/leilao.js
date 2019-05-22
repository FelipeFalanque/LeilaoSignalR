
var chat;
var nome;
var ultimosLances = [];

$(document).ready(function () {
    PerguntaNome();
    // Reference the auto-generated proxy for the hub.
    chat = $.connection.leilaohub;
    // Create a function that the hub can call back to display messages.
    chat.client.LanceEfetuado = function (name, id_item, data) {
        //$("#title_item_" + id_item).text(name);
        $("#desc_item_" + id_item).text(name);

        GerenciaMensagens(data + " Lance dado por "+ name);

        toastr.success("Novo lanche efetuado", name);
    };
    // Start the connection.
    $.connection.hub.start().done(function () {
        console.log("conectado");
    });
});

function Teste(id_item) {
    bootbox.confirm("Deseja da uma lance ?", function (resp) {
        if (resp == true) {
            chat.server.lance(nome, id_item);
        }
        else {
            toastr.error("Lance não foi dado!", "Lance Anulado");
        }
    });
}

function PerguntaNome() {
    bootbox.prompt('<p class="text-center">Qual o seu primeiro nome amigo?</p>', function(result) {
        nome = result;
    });
}

function GerenciaMensagens(msg) {
    if (ultimosLances.length >= 3) {
        //remove o primeiro item
        ultimosLances.splice(0, 1);
        //adiciona no final
        ultimosLances.push(msg);
    } else {
        //adiciona no final
        ultimosLances.push(msg);
    }

    var lis = "";
    for (var i = 0; i < ultimosLances.length; i++) {
        lis += "<li>" + ultimosLances[i] + "</li>"
    }

    $("#ultimos_lances").empty().append(lis);
}