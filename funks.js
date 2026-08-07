const display_conversa = document.querySelector(".display_conversa")

function enviar_mensagem(form)
{
    let msg = new FormData(form)
    console.log(msg.get("msg_field"));
    let texto_enviar = document.createElement("p")
    texto_enviar.innerHTML=msg.get("msg_field")
    texto_enviar.classList.add("enviando")
    display_conversa.appendChild(texto_enviar)
    form.reset()
}