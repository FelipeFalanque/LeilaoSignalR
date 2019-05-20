
var chat;
var nome;

$(document).ready(function () {
    PerguntaNome();
    // Reference the auto-generated proxy for the hub.
    chat = $.connection.leilaohub;
    // Create a function that the hub can call back to display messages.
    chat.client.LanceEfetuado = function (name, id_item, data) {
        $("#title_item_" + id_item).text(name);
        $("#desc_item_" + id_item).text("Ultimo lance - " + name + " " + data);

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
    bootbox.prompt("Seu Nome", function (result) {
        nome = result;
    });
}