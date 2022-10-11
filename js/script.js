const texto_origen = document.querySelector(".de"),
texto_destino = document.querySelector(".hacia"),
seleccionTag = document.querySelectorAll("select"),
boton_intercambio = document.querySelector(".intercambio"),
boton_traduccion = document.querySelector("button"),
iconos = document.querySelectorAll(".columna i");


seleccionTag.forEach((tag, id) =>{
    for (const codigo_pais in paises){
        let seleccionado;
        if(id == 0 && codigo_pais == "es-ES"){
            seleccionado = 'selected';
        }else if(id == 1 && codigo_pais == "en-GB"){
            seleccionado = 'selected';
        }
        let opcion = `<option value="${codigo_pais}"${seleccionado}>${paises[codigo_pais]}</option>`;
        tag.insertAdjacentHTML("beforeend", opcion); 
    }
});

boton_intercambio.addEventListener("click", () =>{
    let texto_temporal = texto_origen.value;
    let idioma_temporal = seleccionTag[0].value;
    texto_origen.value = texto_destino.value;
    seleccionTag[0].value = seleccionTag[1].value;
    texto_destino.value = texto_temporal;
    seleccionTag[1].value = idioma_temporal;
});

boton_traduccion.addEventListener("click", () =>{
    let texto = texto_origen.value,
        traducir_desde = seleccionTag[0].value,
        traducir_hacia = seleccionTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${traducir_desde}|${traducir_hacia}`
    fetch(apiUrl).then(res => res.json().then(data =>{
        texto_destino.value = data.responseData.translatedText;
    }));
})

iconos.forEach(icono => {
    icono.addEventListener("click", ({target}) =>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "origen"){
                navigator.clipboard.writeText(texto_origen.value)
                console.log("ícono de copia izq")
            }else{
                navigator.clipboard.writeText(texto_destino.value)
                console.log("ícono de copia der")
            }
        }else{
            let declaracion;
            if(target.id == "origen"){
                declaracion = new SpeechSynthesisUtterance(texto_origen.value)
                declaracion.lang = seleccionTag[0].value;
            }else{
                declaracion = new SpeechSynthesisUtterance(texto_destino.value)
                declaracion.lang = seleccionTag[1].value;
            }
            speechSynthesis.speak(declaracion);
        }
    });
})
