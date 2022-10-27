const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');
const form = document.getElementById('form')

let tamañoIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamañoIndicador + 'px';

let indexSeccionActiva;


const observer = new IntersectionObserver((entradas, observer) => {
	entradas.forEach(entrada => {
		if (entrada.isIntersecting) {

			indexSeccionActiva = [...secciones].indexOf(entrada.target);
			indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
		}
	});
}, {
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});


observer.observe(document.getElementById('hero'));


secciones.forEach(seccion => observer.observe(seccion));

const onResize = () => {

	tamañoIndicador = menu.querySelector('a').offsetWidth;


	indicador.style.width = `${tamañoIndicador}px`;


	indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize);


let counter = 1;
setInterval(function () {
	document.getElementById('radio' + counter).checked = true;
	counter++;
	if (counter > 4) {
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
