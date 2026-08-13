import contatos from "./assets/contatos.js"

console.log(contatos["whats-users"][0]);

let perfil_atual = contatos["whats-users"][0]

//vizualizando perfil
let profile_foto_view = document.getElementById("profile_foto_view")
let perfil_nickname = document.getElementById("perfil_nickname")
let perfil_recado = document.getElementById("perfil_recado")
let perfil_telefone = document.getElementById("perfil_telefone")


//atualizar perfil
function atualizar_perfil_atual()
{
    perfil_nickname.innerText = perfil_atual.nickname
    perfil_telefone.innerText = perfil_atual.number
}



window.onload(atualizar_perfil_atual())

