const API_KEY = "6d254093e765a79dc3bc4326514605a1";


function buscarClima(){

    let ciudad = document.getElementById("ciudad").value;


    if(ciudad.trim()===""){
        mostrarError("Por favor escribe una ciudad");
        return;
    }


    mostrarCargando();


    // Buscar coordenadas de la ciudad
    let urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=${API_KEY}`;


    fetch(urlGeo)

    .then(r=>r.json())

    .then(datosGeo=>{


        if(datosGeo.length===0){

            throw new Error("Ciudad no encontrada");

        }


        let lat = datosGeo[0].lat;
        let lon = datosGeo[0].lon;
        let nombre = datosGeo[0].name;



        // Obtener clima usando OpenWeatherMap

        let urlClima = 
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;



        return fetch(urlClima)

        .then(r=>r.json())

        .then(datos=>mostrarClima(nombre,datos));


    })


    .catch(error=>{

        mostrarError(error.message);

    });

}




function mostrarClima(ciudad,datos){


    let temperatura = Math.round(datos.main.temp);

    let fahrenheit = Math.round((temperatura*9/5)+32);


    let humedad = datos.main.humidity;

    let viento = datos.wind.speed;


    let clima = datos.weather[0].main;



    let info = obtenerInfoClima(clima);



    cambiarFondo(info.tipo);



    let html = `


    <div class="clima-card">


        <h2>${ciudad}</h2>



        <div class="icono-clima">

            ${info.icono}

        </div>



        <div class="temperatura">

            ${temperatura}°C | ${fahrenheit}°F

        </div>



        <div class="descripcion">

            ${datos.weather[0].description}

        </div>



        <div class="mensaje">

            ${info.mensaje}

        </div>



        <div class="detalles">


            <div class="detalle">

            💧 ${humedad}%

            </div>



            <div class="detalle">

            💨 ${viento} km/h

            </div>


        </div>


    </div>



    `;



    document.getElementById("resultado").innerHTML = html;


}






function obtenerInfoClima(clima){


    if(clima==="Clear"){


        return{

            icono:"☀️",

            tipo:"despejado",

            mensaje:"¡Perfecto para salir!"

        };


    }


    else if(clima==="Clouds"){


        return{


            icono:"☁️",

            tipo:"nublado",

            mensaje:"Tal vez necesites una chaqueta."

        };


    }


    else if(clima==="Rain"){


        return{


            icono:"🌧️",

            tipo:"lluvia",

            mensaje:"No olvides tu paraguas ☔"

        };


    }


    else if(clima==="Thunderstorm"){


        return{


            icono:"⛈️",

            tipo:"tormenta",

            mensaje:"Cuidado con la tormenta ⚡"

        };


    }


    else{


        return{


            icono:"🌤️",

            tipo:"nublado",

            mensaje:"Revisa el clima antes de salir."

        };


    }


}






function cambiarFondo(tipo){


    document.body.className="";


    document.body.classList.add(tipo);


}






function mostrarError(mensaje){


    document.getElementById("resultado").innerHTML =


    `

    <div class="error">

    ❌ ${mensaje}

    </div>

    `;


}






function mostrarCargando(){


    document.getElementById("resultado").innerHTML =


    `

    <div class="cargando">

    ⏳ Buscando clima...

    </div>

    `;


}






document.getElementById("ciudad")

.addEventListener("keypress",function(e){


    if(e.key==="Enter"){


        buscarClima();


    }


});