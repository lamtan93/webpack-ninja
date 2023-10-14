import './assets/style/index.css';
import './assets/style/index.scss';
import logo from './assets/images/webpack-logo.jpeg';
import './assets/fonts/Poppins-Bold.ttf';

const myTitle = document.getElementById('myTitle');
const myButton =  document.createElement("button");
const myLogo = document.createElement('img');
myButton.innerHTML = "Click me";
myLogo.src = logo;
myButton.addEventListener("click", function(){
    alert("button cliked");
    myTitle.classList.add(["myTitle"]);
});

myButton.classList.add(["myButton"])

document.body.append(myButton);
document.body.append(myLogo);