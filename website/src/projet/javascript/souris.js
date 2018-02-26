'use strict'

// Converti un nombre en pixe exemple (200 -> "200px")
function getPixelPosition(nombre) {
	return nombre+'px';
}
// Converti un pixel en un nombre exemple ("200px" -> 200)
function getNumberPosition(pixels) {
	return +pixels.substr(0, pixels.length-2);
}

var score = 0;
var mouse;  
var cheese;
var direction ='droite';
var largeur = document.getElementById('fond_du_jeux').clientWidth;
var hauteur =document.getElementById('fond_du_jeux').clientHeight;


//Fonction qui permet de retirer l'id "cliquez ici pour commcencer"
var removeElementById = function(id) {
	var suppr = document.getElementById(id);//on cible l'element on il ya l'id du boutton
	suppr.parentNode.removeChild(suppr);//Puis on supprime
}

// la fonction move Left permet de faire bouger la pomme
var moveX = function (element, positionX){
	element.style.left = getPixelPosition(positionX);
	}
	
var moveY = function (element, positionY){
	element.style.top = getPixelPosition(positionY);
	}

//bouger la souris
var moveDown = function (){ //fonction qui va vers le bas
	var leftNombre = getNumberPosition(mouse.style.top)+0.9//getNumberPosition converti en nombre la valeur en pixel qu'on a mis en chaine de caractere
	mouse.style.top = getPixelPosition(leftNombre);
}

var moveUp=function(){
	var leftNombre = getNumberPosition(mouse.style.top)-0.9//getNumberPosition converti en nombre la valeur en pixel qu'on a mis en chaine de caractere a valeur 2 permet de gere la vitesse de la div 
	mouse.style.top = getPixelPosition(leftNombre);

}
var moveRight=function(){
	var leftNombre = getNumberPosition(mouse.style.left)+0.9;//getNumberPosition converti en nombre la valeur en pixel qu'on a mis en chaine de caractere snake.
	mouse.style.left = getPixelPosition(leftNombre);       
	                                                       
}                                                          
var moveLeft=function(){                                   
	var leftNombre = getNumberPosition(mouse.style.left)-0.9;//getNumberPosition converti en nombre la valeur en pixel qu'on a mis en chaine de caractere
	mouse.style.left = getPixelPosition(leftNombre);
}


// la fonction Boucle de jeu  permet deplacer les divs en fonction de chaque touche de 10 pixels,des qu'on se deplace avec les curseurs haut bas gauche droite
var boucleDeJeu = function (){	
	
	var leftNombreM = getNumberPosition(mouse.style.left);
	var leftNombreC = getNumberPosition(cheese.style.left);//getNumberPosition converti en nombre la valeur en pixel qu'on a mis en chaine de caractere
	//var leftNombreCat = getNumberPosition(cat.style.left);	
	mouse.style.left = getPixelPosition(leftNombreM);
	cheese.style.left = getPixelPosition(leftNombreC);
	//cat.style.left = getPixelPosition(leftNombreCat);
	
	
	var topNombreM = getNumberPosition(mouse.style.top);
	var topNombreC = getNumberPosition(cheese.style.top);//getNumberPosition converti en nombre la valeur en pixel qu'on a mis en chaine de caractere

	
	mouse.style.top = getPixelPosition(topNombreM);
	cheese.style.top= getPixelPosition(topNombreC);

	
	console.log(leftNombreM);
	console.log(leftNombreC);

	
	//Formule mathématique pour calculer la distance d'un objet à un autre
	 var distance = Math.sqrt(Math.pow(leftNombreM - leftNombreC,2)+Math.pow(topNombreM - topNombreC, 2)); 

	 // condition pour les emplacement aléatoire du fromage avec le math.random qui renvoie un nombre aléatoire
	if (distance < 50){
		moveX(cheese, Math.random()*850);
		moveY(cheese, Math.random()*310);
		//on incremente les score de plus des qu'il touche le fromage sachant que la variable score est égal à zéro
		score ++;
		document.getElementById('point').innerHTML="Score :"+score;
		
		//conditions pour afficher les élément du cv dans le jeu en fonction du score
		if(score == 5){
			/*document.getElementById('compétences').style.display='block';
			document.getElementById('comp').style.display='block';*/
		}
		
		if(score == 10){
			/*document.getElementById('experience').style.display='block';
			document.getElementById('xp').style.display='block';
			document.getElementById('compétences').style.display='none';*/
		}
		
		if(score == 20){
			/*document.getElementById('formations').style.display='block';
			document.getElementById('form').style.display='block';
			document.getElementById('compétences').style.display='none';
			document.getElementById('experience').style.display='none';*/
		}
		
		if(score == 35){
			document.getElementById('divers').style.display='block';
			/*document.getElementById('autre').style.display='block';
			document.getElementById('formations').style.display='none';
			document.getElementById('compétences').style.display='none';*/
			return;
		}
	}
//Condition qui permet de gérer les collisions en la souris et le mur
	if(direction == 'bas'){
		moveDown();// on execute la fonction qui va vers le bas 
		if(getNumberPosition(mouse.style.top) > 450){//on cible l'élément div dans la condition 
			document.getElementById('rejouer').style.display='block';
			return;
		}
	}
	
	if(direction == 'haut'){
		moveUp();
		if(getNumberPosition(mouse.style.top) <= -70){//on cible l'élément div dans la condition 
			document.getElementById('rejouer').style.display='block';
			return;
		}
	}
	
	if(direction == 'gauche'){
		moveLeft();
		if(getNumberPosition(mouse.style.left) <= -1){//on cible l'élément div dans la condition 
			document.getElementById('rejouer').style.display='block';
			return;
			//retourn sans rien mettre a cote stop la fonction, on a mis a zero car on met une valeur negative car il part vers la gauche <--- donc les valeur numériques sont négative
		}
	}
	
	if(direction == 'droite'){
		moveRight();
		if(getNumberPosition(mouse.style.left) > 950 ){
			document.getElementById('rejouer').style.display='block';
			return;
		}
	}
	
	//gérer l'animation en nfois de ahut en bas rvoir si on va a gauche a droite en haut ou en bas gerer les conditions pour savoir quel direction (++requestAnimationFrame permet de dire que cette fonction est rappeler en continue on aura pu mettre un setTimeout(boucleDeJeu, 500) aussi
	window.requestAnimationFrame(boucleDeJeu);
}

// cette fonction permet d'exécuter au moment ou on appuie sur les touches directionnels du clavier
var toucheClavier=function(evt){

	var touche=evt.keyCode;
    
    if(touche==39){
		direction = 'droite'
		document.getElementById('mouse').className = 'mouseleft';
    }
    if(touche==37){
		direction = 'gauche'
		document.getElementById('mouse').className = 'mouseright';
    }
    if(touche==40){
		direction = 'bas'
		document.getElementById('mouse').className = 'mousedown';
    }
    if(touche==38){
		direction = 'haut'
		document.getElementById('mouse').className = 'mouseup';
    }
	if(touche == 32){
		window.location.reload(boucleDeJeu);
	}  
}

var onGameBegin = function(texte){// on créer une variable pour le debut du jeu 
	removeElementById('menu');// puis on supprime le boutton de l'id choisi
	
	// faire appaître la souris dans le jeu
	var elementMouse = document.createElement('div');
	elementMouse.classList.add('mouseleft');
	document.getElementById('fond_du_jeux').appendChild(elementMouse); // on ajoute la variable
	elementMouse.style.top = '200px'; // on deplace le snake de haut en bas
	elementMouse.style.left = '80px'; // on deplace le snake de gauche a droite
	mouse=elementMouse;
	mouse.id = 'mouse';
		
	//faire apparaître le fromage dans le jeu
	var elementCheese=document.createElement('div');
	elementCheese.classList.add('cheese');
	document.getElementById('fond_du_jeux').appendChild(elementCheese);
	elementCheese.style.top='50px';
	elementCheese.style.left='700px';
	cheese=elementCheese;
	cheese.id='cheese';
	boucleDeJeu();
}

document.getElementById('menu').addEventListener('click', onGameBegin);
document.addEventListener('keydown',toucheClavier);