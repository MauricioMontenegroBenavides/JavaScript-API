// Con los metodos http podemos crear informacion, editar, borrar  
const API='https://api.thecatapi.com/v1/images/search?limit=2&api_key=07ac3593-5ffe-48ab-a2e6-4f0eb8c3a56b'
const API2='https://api.thecatapi.com/v1/favourites?api_key=07ac3593-5ffe-48ab-a2e6-4f0eb8c3a56b'
const API3=(id)=>`https://api.thecatapi.com/v1/favourites/${id}?api_key=07ac3593-5ffe-48ab-a2e6-4f0eb8c3a56b` 
const error2=document.getElementById('error');

async function cargar(){
    console.log('uno')
    const res = await fetch(API); // res es un objeto instanciado del prototipo Response
                        /*Response {type: 'cors', url: 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=07ac3593-5ffe-48ab-a2e6-4f0eb8c3a56b', 
                        redirected: false, status: 200, ok: true, …}*/
    const res2=await res.json();

    if(res.status!==200){
        error2.innerHTML= 'hubo un error'+res.status
    }else{
        const img1=document.querySelector('#img1');
        const img2=document.querySelector('#img2');

        const b11= document.getElementById('b1');
        const b22=document.getElementById('b2');

        img1.src=res2[0].url;
        img2.src=res2[1].url;
        
        b11.onclick=()=> guardar(res2[0].id)
        b22.onclick=()=> guardar(res2[1].id)
     }
}

async function favo(){
    console.log('tres')
    const res = await fetch(API2);/* Response {type: 'cors', url: 
                                  'https://api.thecatapi.com/v1/favourites?limit=2', redirected: false, 
                                status: 401, ok: false, …}*/
    const res2=await res.json();  /*{message: "AUTHENTICATION_ERROR - you need to send your API Key as the 'x-api-key' header", 
                              headers: {…}, status: 401, level: 'info'}*/ 
    
    if(res.status!==200){        // Cuando tenemos un error 400 es que nosotros nos equivocamos desde el frontend
                                  // 401 necesitamos autenticacion 
        error2.innerHTML= 'hubo un error oooooooooooooos'+res.status;
    }else{
     console.log(res2)
     const section=document.getElementById('favorito');
     section.innerHTML=''
        res2.forEach(e=> {
           const article=document.createElement('article');
           const img4=document.createElement('img');
           const bnt=document.createElement('button');
           const btnTexto=document.createTextNode('sacar');
           img4.src=e.image.url;
           img4.width=150
           bnt.appendChild(btnTexto);
           bnt.onclick=()=>borrar(e.id)
           article.appendChild(img4);
           article.appendChild(bnt);
           section.appendChild(article)
        });
    }
} 

async function guardar(id){
    console.log('dos')
    const res =await fetch(API2,{// dentro de este objeto contiene toda la inforamcin que se debe enviar a la API
        method:'POST',
        headers:{// AQUI LE DIGO QUE EL LENGUAJE EN EL QUE SE COMUNICAN EL BACKEND Y FRONTEND ES FORMATO JSON
            'Content-Type':'application/json'// Si seria imagenes u otras informacion especial NO SERIA json
        },// {image_id:12} Sirve para ver que imagen guradamos en favoritos 
        body:JSON.stringify({image_id:id}),// Es para espeficicar que imagen se guarda en favoritos , la informacion que se envia al backend 
        // Se realiza la transformacion de informacion porque el backend puede estar escrito en otro lenguaje de programcion que no entienda 
        // la forma de scribir  objetos en JS
    });
    const res2=await res.json();
    if(res.status!==200){
        error2.innerHTML= 'hubo un error'+res.status+res2.message // En res2 estan los errores y la url,mientra que en res esta el status 
    }else{
        favo()
    }
}

async function borrar (id){
    const res =await fetch(API3(id),{
       method:'DELETE',
    });
    const res2=await res.json();
    if(res.status!==200){
        error2.innerHTML= 'hubo un error'+res.status+res2.message // En res2 estan los errores y la url,mientra que en res esta el status 
    }else{
        console.log('BORRAR')
        favo()
        }
    }
cargar();
favo();