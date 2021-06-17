let get = (element) => document.querySelector(element);
var x ;

var persons = get("#person");


var socket = io.connect('http://192.168.252.119:9400/client',);


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
            jobs : '',
            photo: '',
        },
        section: '',
        step1: true,
        step2: false,
        step3: false,
        step4: false,
    },
    methods: {
       
        choosePerson(person){
            this.selectedItem = person.description;
            console.log(this.selectedItem);
            speech(this.selectedItem);
            self.user.jobs = person.poste;
            self.user.name = person.prenoms + ' ' + person.nom;
            self.user.photo = person.photo;
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
            socket.on('manager-section', function (data) {
                console.log("Section manager info coming !!")
                let manager = data.content[0]
                self.user.jobs = manager.poste;
                self.user.name = manager.prenoms + ' ' + manager.nom;
                self.user.photo = manager.photo;
                console.log(data.content)
                turnAllFalse();
                self.step3 = true;
            })
            socket.on('info-section', function (data) {
                console.log("Section info data coming !!")
                self.section = data.content[0].section_image
                console.log(self.section)
                turnAllFalse();
                self.step4 = true;
            })
            socket.on('home', function(data){
                console.log("Go to home display instruction coming...")
                console.log(data);
                turnAllFalse();
                self.step1 = true;
            });
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
    self.step4= false;
}
