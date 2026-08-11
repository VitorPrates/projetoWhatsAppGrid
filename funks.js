const display_conversa = document.querySelector(".display_conversa")

const img_perfil = document.querySelector(".profile_foto_lateral")
const view_perfil = document.querySelector(".perfil")




function enviar_mensagem(form)
{
    let msg = new FormData(form)
    // console.log(msg.get("msg_field"));
    let texto_enviar = document.createElement("p")
    texto_enviar.classList.add("enviando")
    texto_enviar.innerHTML += msg.get("msg_field")
    display_conversa.appendChild(texto_enviar)
    form.reset()
}

img_perfil.addEventListener("click", ()=>{
    view_perfil.classList.toggle("aparecer_perfil")
})