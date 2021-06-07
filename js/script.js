let get = (element) => document.querySelector(element);
var x ;

var persons = get("#person");

var detail = get('#details');
var detail_img = get('#detail-img');
var detail_name = get('#detail-name');
var detail_jobs = get('#detail-jobs');

var socket = io.connect('http://localhost:9400/client',);
// Quand on reçoit un message, on l'insère dans la page
 


const vueApp = new Vue({
    el: '#person',
    selectedItem: null,
    data: {
        display: null,
        testV: false
    },
    methods: {
        choosePerson(person){
            this.selectedItem = person.description;
            console.log(this.selectedItem);
            speech(this.selectedItem);
            persons.style.display = 'none';
            detail_jobs.textContent = person.poste;
            detail_name.textContent = person.prenoms + ' ' + person.nom;
            detail.style.display = 'block';
        },
        testF(){
            console.log("test F")

            socket.on('test', function (data) {

                this.display = data.content
                this.testV = true
                console.log("Executed !!")
                console.log(data.content)

                clear();
                persons.style.display = 'flex'; 
            })
        }
    },
    computed: {
        dataUrl(){
            return 'data:image/jpeg;base64,' + btoa(
                new Uint8Array(this.data.content.photo)
                .reduce((imgData, byte) => imgData + String.fromCharCode(byte), '')
            )
        }
    },
    mounted: function(){
        this.testF()
    }
});

let speech = function(message){
    socket.emit("speak", message);
}
let clear = function(){
    detail.style.display = "none";
    person.style.display = 'none';
}




