const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');
const form = document.getElementById('form')

let tamañoIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamañoIndicador + 'px';

let indexSeccionActiva;

// Observer
const observer = new IntersectionObserver((entradas, observer) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			// Obtenemos cual es la seccion que esta entrando en pantalla.
			// console.log(`La entrada ${entrada.target.id} esta intersectando`);

			// Creamos un arreglo con las secciones y luego obtenemos el index del la seccion que esta en pantalla.
			indexSeccionActiva = [...secciones].indexOf(entrada.target);
			indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
		}
	});
}, {
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});

// Agregamos un observador para el hero.
observer.observe(document.getElementById('hero'));

// Asignamos un observador a cada una de las secciones
secciones.forEach(seccion => observer.observe(seccion));

// Evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
	// Calculamos el nuevo tamaño que deberia tener el indicador.
	tamañoIndicador = menu.querySelector('a').offsetWidth;

	// Cambiamos el tamaño del indicador.
	indicador.style.width = `${tamañoIndicador}px`;

	// Volvemos a posicionar el indicador.
	indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize);

// slader 
let counter = 1;
setInterval(function(){
	document.getElementById('radio' + counter).checked = true;
	counter++;
	if(counter > 4){
		counter = 1;
	}
}, 5000);


form.addEventListener('submit', function (e) {
	e.preventDefault()
	const email = 'lucasjoelquiroga@gmail.com'
	const URL_BASE = `https://formsubmit.co/ajax/${email}`
	const input = e.currentTarget.elements
	const dataForm = {
	   name: input.name.value,
	   email: input.email.value,
	   message: input.message.value
	}
	window.fetch(URL_BASE, {
	 method: "POST",
	 headers: { 
		 'Content-Type': 'application/json',
		 'Accept': 'application/json'
	 },
	 body: JSON.stringify(dataForm)
 })
	 alert('Tu mensaje se envio correctamente')
	e.currentTarget.reset()
 
  })
