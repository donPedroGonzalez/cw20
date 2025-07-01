var questions, answers, hints;
window.onload = onPageLoad();

function onPageLoad()
{   
    document.getElementById("button").disabled = true;
    let reloadButton = document.getElementById("reloadPage");
    reloadButton.addEventListener("click", clearForm);

    var exerciceBody = document.getElementById("exercice-wrapper");
    questions = [ "Przetłumacz zdania na francuski", "Mój szef usiadł obok mnie.", "Jego młodsza córka ma 12 lat.", "Jego starsza córka ma na imię Amélie.", "Boli mnie głowa.", "Spędziłem czas z moją rodziną.", "Który z dwóch mężczyzn mówi po niemiecku?", "To jest wredna osoba!", "To jest tchórz!", "On się popisuje!", "To jest gaduła!" ];
    answers = [ "Traduisez les phrases en français", "Mon chef s'est assis à côté de moi.", "Sa fille cadette a 12 ans.", "Sa fille aînée s'appelle Amélie.", "J'ai mal à la tête.", "J'ai passé du temps avec ma famille.", "Lequel des deux hommes parle allemand ?", "C'est une peau de vache !", "C'est une poule mouillée !", "Il se la joue !", "C'est une grande gueule !" ];
    hints = [ "Appr. continu", "à côté de = obok", "cadette = młodsza", "aînée = starsza", "avoir mal à...", "passer du temps", "lequel = który", "idiom: skóra krowy", "idiom: mokra kura", "se la jouer", "gueule = pysk" ];

    var myForm = document.createElement("form");
    myForm.setAttribute("id", "myExercice"); 
    document.getElementById("premiere-consigne").innerText = questions[0];
    document.getElementById("deuxieme-consigne").innerText = answers[0];
    document.getElementById("footer-cat-info").innerText = hints[0];

    // Creating a form with questions, inputs and hints
    var newItemLabel, newItemInput;

    for(var i = 1; i < questions.length; i++)
    {
        newItemLabel = document.createElement("label");
        newItemLabel.setAttribute("for", "item"+i);
        //newItemLabel.innerText = questions[i] + " (" + hints[i] + ")";
        newItemLabel.innerText = questions[i] + "  ";
        newHintSubItem = document.createElement("span")
        newHintSubItem.innerText =  "(" + hints[i] + ")";
        newHintSubItem.setAttribute("style", "font-style: italic; font-size:12pt;")
        var paragraph = document.createElement("p");
        paragraph.appendChild(newItemLabel);
        paragraph.appendChild(newHintSubItem);
        myForm.appendChild(paragraph);   
        newItemInput = document.createElement("input");
        newItemInput.setAttribute("type", "text");        
        newItemInput.setAttribute("name", "item"+i);
        newItemInput.setAttribute("id", "item"+i);
        newItemInput.setAttribute("style", "min-width: 420px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:16pt;");
        var paragraph = document.createElement("p");        
        paragraph.setAttribute("id", "par" + i);
        paragraph.appendChild(newItemInput);
        myForm.appendChild(paragraph); 
    }
    exerciceBody.appendChild(myForm);

    // Creating the virtual keyboard

    var inputs = document.getElementById("myExercice").getElementsByTagName("input");
    var keyb = document.getElementById("keyboard");    
    var keybKeys = keyb.getElementsByTagName("input");
    var exTitleWindow = document.getElementById("main-window-title");
    var keybReset = document.getElementById("reset-keyboard");
    var keybActivate = document.getElementById("activate-keyboard");
    keybReset.addEventListener("click", keyboardDeactivation);  
    keybActivate.addEventListener("click", keyboardReactivation);  

    for(var k=0; k < inputs.length; k++)
    {
        //let activateInput = keyboardActivation.bind(inputs[k]);
        // inputs[k].addEventListener("onclick", activateInput());
        inputs[k].addEventListener("click", keyboardActivation);
    }
    function keyboardActivation(e)
    {
        // console.log("this: " + this);
        // console.log("this.getBoundingClientRect-right: " + this.getBoundingClientRect().right);
        // console.log("this.getBoundingClientRect-top: " + this.getBoundingClientRect().top);
        // console.log("this.getAttribute-left: " + this.getAttribute("left"));
                
        var self = this;
        /*keyb.style.display = "block";*/
        keyb.setAttribute("class", "");
        keybReset.setAttribute("class", "");
        // keyb.style.top = Number(e.clientY + -105) + "px";
        keyb.style.top = Number(this.getBoundingClientRect().top) + "px";
        // console.log("onclick-pageY: " + e.pageY);
        // keyb.style.left = Number(e.clientX + 275) + "px";
        keyb.style.left = Number(this.getBoundingClientRect().right + 10) + "px";
        // keybReset.style.display = "grid";
        keybReset.addEventListener("click", keyboardDeactivation);  
        for(var m = 0; m < keybKeys.length; m++)
        {
            keybKeys[m].addEventListener("onclick", virtualKeyboard(m, k));
            function virtualKeyboard(m, k)
            {   
                keybKeys[m].onclick = function()
                {
                    self.value += this.value;
                }                    
            }  
        }
    }
    function keyboardDeactivation()
    {

        keyb.setAttribute("class", "hidden");
        // keybReset.setAttribute("class", "hidden");
        keybReset.disabled = true;
        // keybActivate.setAttribute("class", "grid");
        keybActivate.disabled = false;
        for(var k=0; k < inputs.length; k++)
        {
            inputs[k].removeEventListener("click", keyboardActivation);
        }            
    }  
    function keyboardReactivation()
    {
        for(var k=0; k < inputs.length; k++)
        {
            inputs[k].addEventListener("click", keyboardActivation);
            // keybActivate.setAttribute("class", "hidden");
            keybActivate.disabled = true;
            keybReset.disabled = false;
        }
    }  
        // CHECKING ANSWERS

    var answer, itemName, itemToCheck, formToCheck, myparagraph, resultWrapper;
    var correctNumber = 0;

    document.getElementById("button").onclick = function()
    {
        for(var i = 1; i < questions.length; i++)
        {
            keyboardDeactivation();
            answer = answers[i];
            itemName = "item" + i;
            formToCheck = document.getElementById("myExercice");
            itemToCheck = formToCheck.elements[itemName].value;
            // removing old result content if present in case of second, third etc. check button click.
            let spans = document.getElementById("par"+i).getElementsByClassName("check-answer");
            for (let m = 0; m < spans.length; m++)
            {
                spans[m].parentNode.removeChild(spans[m]);            
            }
            if (itemToCheck !== answers[i])
            {            
                myparagraph = document.createElement("span");
                myparagraph.setAttribute("id", "answer"+i);
                myparagraph.setAttribute("style", "color:red;");
                myparagraph.setAttribute("class", "check-answer");
                myparagraph.innerText = " - La réponse correcte : " + answers[i];
                document.getElementById("par"+i).appendChild(myparagraph);
            }else
            {
                myparagraph = document.createElement("span");
                myparagraph.setAttribute("id", "answer"+i);
                myparagraph.setAttribute("style", "color:green;");
                myparagraph.setAttribute("class", "check-answer");
                myparagraph.innerText = " - C'est correct, félicitations !";
                document.getElementById("par"+i).appendChild(myparagraph);
                correctNumber++;
            }
            resultWrapper = document.getElementById("result-wrapper");
            resultWrapper.innerText = "Ton résultat : " + correctNumber + " / " + Number(questions.length-1);
            resultWrapper.setAttribute("style", "font-size: larger; color: dark-blue; text-shadow: 0px 0px 3px white;" )
        }
    }  
}

var inputToFill;
var filledIn;

window.onkeydown = function()
{
    for(var i = 1; i < questions.length; i++)
    {
        filledIn = true;
        itemName = "item" + i;
        formToCheck = document.getElementById("myExercice");
        itemToCheck = formToCheck.elements[itemName].value;
        if (!itemToCheck)
        {
            filledIn = false;
            break;
        }
    }
    if (filledIn === true)
    {
        document.getElementById("button").disabled = false;
    }
}


function clearForm()
{
    for(var i = 1; i < questions.length; i++)
    {
        formToClear = document.getElementById("myExercice");
        formToClear.reset();
        // removing old result content if present in case of second, third etc. check button click.
        let spans = document.getElementById("par"+i).getElementsByClassName("check-answer");
        for (let m = 0; m < spans.length; m++)
        {
            spans[m].parentNode.removeChild(spans[m]);            
        }
        document.getElementById("result-wrapper").innerText = "";
    }
    
}