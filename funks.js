import {usuarios, listar_todos, listar_contatos_user} from "./assets/contatos.js"

// console.table(listar_todos())
// listar_contatos_user(2)
// console.table(usuarios["whats-users"][0]);


const display_conversa = document.querySelector(".display_conversa")

const img_perfil = document.querySelector(".profile_foto_lateral")
const view_perfil = document.querySelector(".perfil")

let perfil_atual = usuarios["whats-users"][0]

//vizualizando perfil
let profile_foto_view = document.getElementById("profile_foto_view")
let perfil_nickname = document.getElementById("perfil_nickname")
let perfil_recado = document.getElementById("perfil_recado")
let perfil_telefone = document.getElementById("perfil_telefone")
let contas_disponiveis = document.getElementById("contas_disponiveis")


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
        form.reset()
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




//atualizar perfil
function atualizar_perfil_atual()
{
    perfil_nickname.innerText = perfil_atual.account
    perfil_telefone.innerText = perfil_atual.number
    let contas = listar_todos()
    contas_disponiveis.innerHTML = ""
    contas.forEach((conta)=>{
        contas_disponiveis.innerHTML += `
         <div class="perfil_troca">
            <img class="profile_foto_lateral" src="https://fastly.picsum.photos/id/177/200/200.jpg?hmac=785Vry8HsdS9dQ7mFYbwV8bR2tWVtzJWWl9YLp6L0n8" alt="" srcset="">
            <p>${conta.nickname}</p>
        </div>
                `
    })
    //Para trocar de perfil / conta
    let perfil_troca = document.querySelectorAll(".perfil_troca")
    perfil_troca.forEach((perfil,index) =>{
        perfil.addEventListener("click", ()=>{
            // console.log(index);
            perfil_atual = usuarios["whats-users"][index]
            atualizar_perfil_atual()
        })
    })
}



window.addEventListener("load", () => {
    atualizar_perfil_atual()
})

