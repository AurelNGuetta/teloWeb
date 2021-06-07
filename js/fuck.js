let get = (element) => document.querySelector(element);
var x ;

var persons = get("#person");

var detail = get('#details');
var detail_img = get('#detail-img');
var detail_name = get('#detail-name');
var detail_jobs = get('#detail-jobs');

var socket = io.connect('http://192.168.252.216:9400/client',);


// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function (data) {
    console.log(data.content)
    get('#message').innerHTML = data.content;

})

const vueApp = new Vue({
    el: '#root',
    selectedItem: null,
    data: {
        persons: [],
        user: {
            name : '',
            jobs : ''
        },
        step1: true,
        step2: false,
        step3: false,
    },
    methods: {
       
        choosePerson(person){
            this.selectedItem = person.description;
            console.log(this.selectedItem);
            speech(this.selectedItem);
            self.user.jobs = person.poste;
            self.user.name = person.prenoms + ' ' + person.nom;
            turnAllFalse();
            self.step3 = true;
        },
        testF(){
            
            console.log("test F")
            self = this
            socket.on('test', function (data) {
                console.log("List of persons coming !!")
                console.log(data.content)
                self.persons = data.content;
                console.log("serv", self.persons)
                turnAllFalse();
                self.step2 = true;
            })
        },
    
    },
    mounted: function(){
        this.testF()
        // this.change()
    }
});

let speech = function(message){
    socket.emit("speak", message);
}

let clear = function(){

}

let turnAllFalse = function(){
    self.step1= false;
    self.step2= false;
    self.step3= false;
}
