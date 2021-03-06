const COSTES = [20,5,5,6,4,2,1];
const OPCIONES = [null, [[1,1],[0,2]] , [[2,1],[1,2],[0,3]] , [[2,2],[3,1],[1,3],[0,4]] , [[3,2],[2,3],[0,5]] , [[4,2],[2,4],[1,5]] , [[4,3],[3,4],[1,6]] ];

const MANOINICIAL = 5;
const MAXMANO = 8;

const MANOARRIBA = "manoArriba";
const MANOABAJO = "manoAbajo";

/* Cosas Player 1 */
let barajap1 = [];
let manop1 = [];
let mesap1 = [];
let manap1 = 0;
let hpp1 = 40;

/* Cosas Player 2 */
let barajap2 = [];
let manop2 = [];
let mesap2 = [];
let manap2 = 0;
let hpp2 = 40;

function generarMazos(){
	barajap1.push.apply(barajap1,genMana());
	barajap2.push.apply(barajap2,genMana());

	for (let i = 1; i < COSTES.length; i++) {
		barajap1.push.apply(barajap1,genClase(i));
		barajap2.push.apply(barajap2,genClase(i));
	}
}

function genClase(coste){
	let tmpCartas = []
	let tAtk;
	let tDef;

	for (let i = 0; i < COSTES[coste]; i++) {
		let j = Math.floor(Math.random() * (OPCIONES[coste].length));
		tAtk = OPCIONES[coste][j][0]
		tDef = OPCIONES[coste][j][1]

		tmpCartas.push(new Carta(coste,tAtk,tDef));
	}

	return tmpCartas;
}

function genMana(){
	let tmpCartas = []
	for (let i = 0; i < COSTES[0]; i++){
		tmpCartas.push(new Carta(0,null,null));
	}
	return tmpCartas;
}

function darMano(jugador,mazo){

	for (let i = 0; i < MANOINICIAL; i ++) {
		jugador[i] = mazo.splice(rdm(0,mazo.length),1)[0];
	}

	return jugador;
}

function rdm(min,max){
	return Math.floor((Math.random() * max) + min);
}

/* funciones de renderizado */

function renderMano(mano,lado) {
	let manoHTML = "";

	mano.forEach(function(carta) {
		manoHTML += carta.html;
	});

	document.getElementById(lado).innerHTML = manoHTML;
}

function darCarta(mano,mazo){
	mano.push(mazo.splice(rdm(0,mazo.length),1)[0]);
}

function start(){
	generarMazos();
	darMano(manop1,barajap1);
	renderMano(manop1,MANOABAJO);

	darMano(manop2,barajap2);
	renderMano(manop2,MANOARRIBA);
}