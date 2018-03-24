

var plotno=document.getElementById("plotno");
var kontekst=plotno.getContext("2d");

var szerokosc=plotno.width;
var wysokosc=plotno.height;


var scores=0;

document.getElementById("scores").innerHTML=scores;


var paletka=function(x){



    kontekst.fillStyle="green";
    kontekst.fillRect(x,470,100,20);

};


var Paleta=function ()

{
    this.x =szerokosc/2;
    this.xszybkosc=5;
};


Paleta.prototype.ruch=function () {

    this.x+=this.xszybkosc;

    if(this.x<0)
    {
        this.x=szerokosc;

    }
    else if(this.x>szerokosc)
    {
        this.x=0;

    };

};


Paleta.prototype.rysuj=function () {

    paletka(this.x);

};

Paleta.prototype.kierunek=function(kierunek){

    if(kierunek==="lewo") this.xszybkosc=-5;
    else if(kierunek==="prawo") this.xszybkosc=5;


};


var chillybilly=new Paleta();





var info={

    37:"lewo",
    39:"prawo",


};


$("body").keydown(function(zdarzenie){


    var kierunek=info[zdarzenie.keyCode];
    chillybilly.kierunek(kierunek)
});




var okrag=function (x,y,promien,wypelnienie) {

    kontekst.beginPath();
    kontekst.arc(x,y,promien,0,Math.PI*2,false);


    if(wypelnienie)
    {

        kontekst.fillStyle="yellow";
        kontekst.fill();
    }
    else
    {
        kontekst.stroke();

    }

};



var Pilka=function () {

    this.x=szerokosc/2;
    this.y=wysokosc/2;

    this.xszybkosc=5;
    this.yszybkosc=-3;


};

Pilka.prototype.rysowanie=function(){


    okrag(this.x,this.y,10,true)

};




Pilka.prototype.przesuwaj=function(){

    this.x+=this.xszybkosc;
    this.y+=this.yszybkosc;


};



Pilka.prototype.collision=function(){


    if(this.x<10 || this.x>szerokosc-10) this.xszybkosc=-this.xszybkosc;

    else if(this.y<10) this.yszybkosc=-this.yszybkosc;



    for(var i=0;i<100;i++) {

        if ((this.y > 465) && (this.x === chillybilly.x + i))
        {


            this.yszybkosc = -this.yszybkosc;
            scores++;
            document.getElementById("scores").innerHTML=scores;

        }

    }

    if(this.y>490)
    {

        this.yszybkosc=-this.yszybkosc;

        scores=0;
        document.getElementById("scores").innerHTML=scores;
    }


};


var kuleczka=new Pilka();


setInterval(function(){

    kontekst.clearRect(0,0,700,500);
    chillybilly.rysuj();
    chillybilly.ruch();
    chillybilly.kierunek();

    kuleczka.collision();
    kuleczka.rysowanie();
    kuleczka.przesuwaj();



    kontekst.lineWidth=4;
    kontekst.strokeRect(0,0,700,500);


},20);


