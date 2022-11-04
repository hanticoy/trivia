//https://opentdb.com/api.php?amount=10

// General Knowledge         	  &category=9
// Geography					  &category=22
// Entertainment: Music			  &category=12
// Politics						  &category=24
// Entertainment: Books           &category=10   	
// Entertainment: Video Games     &category=15
// Entertainment: Television      &category=14 
// History                        &category=23
// Vehicles                       &category=28
// Science & Nature               &category=17
// Entertainment: Film            &category=11
// Entertainment: Comics          &category=29

let Categorys =[
    {nombre:'General Knowledge',id:9},
    {nombre:'Geography',id:22},
    {nombre:'Entertainment: Music',id:12},
    {nombre:'Politics',id:24},
    {nombre:'Entertainment: Books',id:10},
    {nombre:'Entertainment: Video Games',id:15},
    {nombre:'Entertainment: Television',id:14},
    {nombre:'History',id:23},
    {nombre:'Vehicles',id:29},
    {nombre:'Science & Nature',id:17},
    {nombre:'Entertainment: Film',id:11},
    {nombre:'Entertainment: Comics',id:29},
    {nombre:'Entertainment: Cartoon & Animations',id:32},
    {nombre:'Celebrities',id:26},
    {nombre:'Science: Mathematics',id:19},
    {nombre:'Science: Computers',id:18},
    {nombre:'Science & Nature',id:17},
    {nombre:'Mythology',id:20},
    {nombre:'Sports',id:21},
    {nombre:'Politics',id:24},
    {nombre:'Art',id:25},
    {nombre:'Animals',id:27},
    {nombre:'Entertainment: Board Games',id:13},
    {nombre:'Entertainment: Musicals & Theatres',id:16},
    {nombre:'Entertainment: Japanese Anime & Manga',id:31}
    
]

function armaHtml(obj) {
let cadenaHtml="";

    cadenaHtml="<div class='puntos'>Por 100 puntos</div>"
    cadenaHtml= cadenaHtml + "<div class='quiestion'>" + obj[0]['question'] + '</div>'
    cadenaHtml= cadenaHtml + "<div class='alternativa'>"
        cadenaHtml= cadenaHtml + "<div>"
            cadenaHtml= cadenaHtml + "<input type='radio'>" + obj[0]['correct_answer']
        cadenaHtml= cadenaHtml + "</div>"    
        
        let arrResp =  obj[0]['incorrect_answers']
            
            arrResp.forEach(element => {
                cadenaHtml= cadenaHtml + "<div>"
                    cadenaHtml= cadenaHtml + "<input type='radio'>" + [element];
                cadenaHtml= cadenaHtml + "</div>"
            })
        cadenaHtml= cadenaHtml + "</div>"
    cadenaHtml= cadenaHtml + "</div>";

    return cadenaHtml;
}

function CargarPreguntas(param,indice) {
    
    console.log('indice:' + indice)

    //$.get(url, response) donde response representa el objeto resultante de la consulta ajax a la API
    $.get("https://opentdb.com/api.php?amount=9&category=" + param, function (data) {
            //console.log(data);
            
            let listPregunta = document.querySelectorAll('#pregunta' + indice)

            let myEasy = data['results'].filter((pregunta) => pregunta.difficulty == 'easy');
            let myMedium = data['results'].filter((pregunta) => pregunta.difficulty == 'medium');
            let myHard = data['results'].filter((pregunta) => pregunta.difficulty == 'hard');
            
            //console.log('easy:' + myEasy[0]['difficulty'], 'medium:' + myMedium[0]['difficulty'], 'hard:' +  myHard[0]['difficulty']);

            listPregunta[0].innerHTML = armaHtml(myEasy);
            listPregunta[1].innerHTML = armaHtml(myMedium);
            listPregunta[2].innerHTML = armaHtml(myHard);
        }
    )

}

function CargarCategorias(param) {
    let cat;
    let cadena = '';
    let listCategory = document.querySelectorAll('.categoria')

    //$.get(url, response) donde response representa el objeto resultante de la consulta ajax a la API
    $.get("https://opentdb.com/api.php?amount=19", function (data) {
            // console.log(data);

            let wArr = data['results']
            let indice = 0;
            wArr.forEach(element => {
                if ((cadena.indexOf(element['category']) < 0) && (indice <= listCategory.length-1)) {
                    
                    listCategory[indice].innerHTML = element['category'];
                    
                    cat = Categorys.filter((category) => category.nombre == element['category']);
                    
                    CargarPreguntas(cat[0].id,indice)
                    
                    cadena = cadena  + ',' + element['category']
                    indice++
                }
            });

        }
    )

}

CargarCategorias()
