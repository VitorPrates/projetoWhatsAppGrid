import {usuarios, listar_todos, listar_contatos_user} from "./assets/contatos.js"

// console.table(listar_todos())
// listar_contatos_user(2)
// console.table(usuarios["whats-users"][0]);

function modo_escuro(atualizar)
{
    let pagina = document.querySelector("body")
    if(atualizar)
    {
        pagina.classList.toggle("escuro")
    }
    document.querySelectorAll(".ant-escuro").forEach(ant =>{
        console.log(ant);
        
        if(pagina.classList.contains("escuro"))
        {
            ant.style.filter = "invert(1)"
        }
        else
        {
            ant.style.filter = "invert(0)"
        }
    })
}

document.getElementById("settings_control").addEventListener("click",()=>{
    modo_escuro(true)
})

const display_conversa = document.querySelector(".display_conversa")

const img_perfil = document.querySelector(".profile_foto_lateral")
const view_perfil = document.querySelector(".perfil")
let mensagem_final = false
let quant_msg = 0


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
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    const horaFormatada = `${horas}:${minutos}`;

    // console.log(msg.get("msg_field"));
    if (msg.get("msg_field") == "" || msg.get("msg_field").trim() == "") {
        form.reset()
        return
    }
    let bloco_texto = document.createElement("span")
    let content = document.createElement("p")
    let hora_msg = document.createElement("span")
    let indicador = document.createElement("div")
    
    bloco_texto.classList.add("enviando")
    content.classList.add("msg")
    indicador.classList.add("indicador-me")

    content.innerHTML += msg.get("msg_field")
    hora_msg.innerHTML = horaFormatada
    
    bloco_texto.appendChild(content)
    bloco_texto.appendChild(hora_msg)
    if(!mensagem_final)
    {
        bloco_texto.appendChild(indicador)
    }
    mensagem_final = true
    bloco_texto.style.width = "fit-content"

    display_conversa.appendChild(bloco_texto)
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
    let conversante_atual = document.getElementById("conversante_atual")
    let display_conversa = document.getElementById("display_conversa")
    display_conversa.innerHTML = ""
    conversante_atual.innerHTML = ""
    contas_disponiveis.innerHTML = ""
    contas.forEach((conta,index)=>{
        // profile_foto_view.src = `https://i.pravatar.cc/150?img=${index+1}`
        contas_disponiveis.innerHTML += `
         <div class="perfil_troca">
            <img class="profile_foto_lateral" src="https://i.pravatar.cc/150?img=${index+3}" alt="" srcset="">
            <p>${conta.nickname}</p>
        </div>
                `
    })
    //Para trocar de perfil / conta
    let perfil_troca = document.querySelectorAll(".perfil_troca")
    let foto_lateral = document.getElementById("profile_foto_lateral")
    perfil_troca.forEach((perfil,index) =>{
        perfil.addEventListener("click", ()=>{
            // console.log(index);
            perfil_atual = usuarios["whats-users"][index]
            profile_foto_view.src = `https://i.pravatar.cc/150?img=${index+3}`
            foto_lateral.src = `https://i.pravatar.cc/150?img=${index+3}`
            atualizar_perfil_atual()
        })
    })
    atualizar_contatos_atual()
}

//atualizar contatos
function atualizar_contatos_atual()
{
    let contatos = perfil_atual.contacts
    let todos_contatos = document.getElementById("lista_contatos")
    
    todos_contatos.innerHTML = ""
    contatos.forEach(contato =>{
        todos_contatos.innerHTML += `
        <div class="contato">
            <div class="foto_colega">
                <img src="./assets/imgs/defaultperfil.gif" alt="Foto">
            </div>
            <h3>${contato.name}</h3>
            <p>${contato.messages.at(-1).content}</p>
            ${contato.messages.at(-1).sender == "me" ? "" : `<span class="hora_mensagem">${contato.messages.at(-1).time}</span>
            <span class="quant_mensagem">${1}</span>`}
        </div>`
    })
    let contato_salvo = document.querySelectorAll(".contato")
    let conversante_atual = document.getElementById("conversante_atual")
    
    contato_salvo.forEach((contato,index) =>{
        contato.addEventListener("click", (e)=>{
            atualizar_conversas_tela(perfil_atual.contacts[index].messages);
            conversante_atual.innerHTML = perfil_atual.contacts[index].name
            contato.innerHTML = contato.innerHTML.slice(0, -90)
            
        })
    })
}

function atualizar_conversas_tela(mensagens)
{
    let display_conversa = document.getElementById("display_conversa")
    


    display_conversa.innerHTML = ""
    mensagens.forEach(mensagem => {
        // console.log(mensagem);
        if (mensagem.sender == "me") {
            mensagem_final = true
            display_conversa.innerHTML += `
                <span class="enviando">
                    <div class="msg">${mensagem.content}</div>
                    <span>${mensagem.time}</span>
                    ${mensagem_final ? "<div class='indicador-me'></div>" : "" }
                </span>
           `
        }
        else
        {
            mensagem_final = false
            quant_msg += 1
            display_conversa.innerHTML += `
                <span class="recebendo">
                    <div class="msg">${mensagem.content}</div>
                    <span>${mensagem.time}</span>
                    <div class="indicador"></div>
                </span>
            `
        }
    })
    
}



window.addEventListener("load", () => {
    atualizar_perfil_atual()
    modo_escuro()
})

