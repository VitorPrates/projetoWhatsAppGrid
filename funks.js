const display_conversa = document.querySelector(".display_conversa")

const img_perfil = document.querySelector(".profile_foto_lateral")
const view_perfil = document.querySelector(".perfil")



let form_envio_msg = document.getElementById("form_envio_msg")

form_envio_msg.addEventListener("submit", (e) => {
    e.preventDefault()
    enviar_mensagem(form_envio_msg)
})
function enviar_mensagem(form)
{
    let msg = new FormData(form)
    // console.log(msg.get("msg_field"));
    if (msg.get("msg_field") == "" || msg.get("msg_field").trim() == "") {
        return
    }
    let texto_enviar = document.createElement("p")
    texto_enviar.classList.add("enviando")
    texto_enviar.innerHTML += msg.get("msg_field")
    display_conversa.appendChild(texto_enviar)
    display_conversa.scrollTo(0,display_conversa.scrollHeight)
    form.reset()
}

img_perfil.addEventListener("click", ()=>{
    view_perfil.classList.toggle("aparecer_perfil")
})