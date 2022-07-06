$(document).ready(function(){
    $("#postalCode").on('input', searchCity);
    $("#add-contact").on("submit", sendForm);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contacts = JSON.parse(localStorage.getItem('contacts'));



    function SortArray(x, y){
        if (x.nom < y.nom) {return -1;}
        if (x.nom > y.nom) {return 1;}
        return 0;
    }
    var s = contacts.sort(SortArray);
    console.log(s);
    
    contacts.forEach((item) => {
        var ul = document.getElementById("List");
        let nom = item.nom;
        let prenom = item.prenom;
        console.log(nom) //value
        let li = document.createElement("li");
        let btn = document.createElement("button");
        ul.appendChild(li);
        li.appendChild(btn);
        btn.innerHTML += nom + " " + prenom;
        $(btn).data("contact", {
            phone: item.phone,
            mail: item.mail,
            nom: item.nom,
            prenom: item.prenom,
            adresse: item.adresse,
            dateDeNaissance: item.dateDeNaissance,
            codePostal: item.codePostal
        });
        $("#List button").addClass("buttonnom");
            // let li = document.createElement("li");

        
        // var li = document.createElement("li");
        // li.appendChild(document.createTextNode("Four"));
        // ul.appendChild(li);
        
    });
    $("#reset").on('click', reset);
    $("#List button").on('click', showInfos);
    $("#closeModal").on('click', function(){
        $(".modal").hide();
    });
});

function searchCity(){
    let urlPC = "https://apicarto.ign.fr/api/codes-postaux/communes/";
    console.log($(this).val().length);
    if($(this).val().length === 5){
        let postalCode = $(this).val();
        urlPC += postalCode;
        $.ajax({
            url: urlPC,
        }).done(function(data){
            console.log(data);
            document.getElementById('city').options.length = 0;
            $.each(data, function(i, item){
                $("#city").append($('<option>', {
                    value: item.codeCommune,
                    text: item.nomCommune
                }));
            });
        })
        $("#city").prop("disabled", false);
    }
}

function sendForm(e){
    e.preventDefault();
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let newContact;
    let name = $("#name").val();
    let firstName = $("#firstName").val();
    let birth = $("#birth").val();
    let phone = $("#phone").val();
    let mail = $("#mail").val();
    let adresse = $("#adresse").val();
    let postalCode = $("#city").val();
    newContact = {
        "name": name,
        "firstName": firstName,
        "birth": birth,
        "phone": phone,
        "mail": mail,
        "adresse": adresse,
        "postalCode": postalCode
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    constacts = JSON.parse(localStorage.getItem('contacts'));
    var ul = document.getElementById("List");
    let li = document.createElement("li");
    let btn = document.createElement("button");
    ul.appendChild(li);
    li.appendChild(btn);
    btn.innerHTML += name + " " + firstName;
    $(btn).data("contact", {
        phone: phone,
        mail: mail,
        nom: name,
        prenom: firstName,
        adresse: adresse,
        dateDeNaissance: birth,
        codePostal: postalCode
    });
    $("#List button").addClass("buttonnom");
    $("#List button").on('click', showInfos);
}

function reset(e){
    $("#name").val("");
    $("#firstName").val("");
    $("#birth").val("");
    $("#phone").val("");
    $("#mail").val("");
    $("#adresse").val("");
    $("#postalCode").val("");
    document.getElementById('city').options.length = 0;
    $("#city").prop("disabled", true);
}

function showInfos(){
    console.log($(this).data("contact").nom);
    $("#modal_name").text($(this).data("contact").nom + " " + $(this).data("contact").prenom);
    $("#modal_phone").text("Téléphone : " + $(this).data("contact").phone);
    $("#modal_mail").text("E-mail : " + $(this).data("contact").mail);
    $("#modal_adresse").text("Adresse : " + $(this).data("contact").adresse);
    $("#modal_naissance").text("Date de Naissance : " + $(this).data("contact").dateDeNaissance);
    $("#modal_codepostal").text("Code Postal : " + $(this).data("contact").codePostal);
    $(".modal").show();
}