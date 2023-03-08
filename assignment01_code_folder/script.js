
// course information here as object contains an array of object of course 
let courses = {
    data:[
        {
           courseName: "Intro to Computer Programming",
           level: 1,
           image: "img/java 1.jpg", 
           description: "Possessing the fundamentals of logic, problem-solving and programming language structure provides a solid foundation for further study in the field. Students develop introductory knowledge of computer programming with emphasis on problem analysis and design, using algorithms, pseudocode, flowcharts, UML Class Diagrams and testing, with the Java programming language used as a means to implement problem solution designs. Through an introduction to the Java programming language students use sequential structures, selection structures, repetition structures, variables, constants, methods, constructors, one-dimensional arrays, object-oriented programming, classes, objects, abstraction, encapsulation, inputs, outputs, coding conventions and documentation. Theory is reinforced with application by means of practical laboratory assessments."

        },
        {
            courseName: "Object Oriented Programming",
            level: 2,
            image: "img/java 2.jpg", 
            description: "Working in the field of information technology as a programmer requires a firm understanding of Object-Oriented Programming (OOP) concepts. Students explore object-oriented programming methodology using the Java programming language. Object oriented concepts, such as encapsulation, inheritance, abstraction and polymorphism are covered and reinforced with practical applications. Students explore the basics of data structures and algorithms as well as basic Graphical User Interface (GUI) programming."
         },
         {
            courseName: "Introduction to Database",
            level: 1,
            image: "img/database 1.jpg", 
            description: "Databases are used to store data and are a core component of many information technology systems. Students learn the fundamentals of relational databases design using Entity Relation Diagrams (ERDs), and use Structured Query Language (SQL) to create, modify and query a database. Students design and create databases that are maintainable, secure and adaptable to change in business requirements, using normalization. Students become familiar with the functions of a Database Management System (DBMS) and its components in comparison with legacy systems and alternative information storage mechanisms."
         },
         {
            courseName: "Database Systems",
            level: 2,
            image: "img/database 2.jpg", 
            description: "Database systems can automate data processing tasks as well as tie into the security of information technology systems. Students acquire practical experience using market-leading object-relational database management systems like Oracle and MySQL. Students obtain hands-on experience with advanced engineering modeling tools along with SQL, SQL scripts and programming with Oracle's PL/SQL blocks. Database concepts covered include advanced SQL, case structures, rollup and cube operations, metadata manipulation, data storage and retrieval, security and transaction control and data warehousing."
         },
         {
            courseName: "Operating Systems Fund (GNU/Linux)",
            level: 2,
            image: "img/linux.jpg", 
            description: "Operating systems form the backbone of information technology systems coordinating the interaction between hardware and software. Students explore the basic concepts and components of Operating Systems (OS), and how they function and interact with hardware and software components. Students examine the details of operating system structures, process management, storage management, installation, configuration, and administration both in theory and through practical assignments based on the GNU/Linux operating system. Lab work is designed to implement the theory by developing skills using the powerful GNU/Linux command-line tools and utilities."
         },
         {
            courseName: "Computer Essentials",
            level: 1,
            image: "img/computer essentials.jpg", 
            description: "The essentials of computer software, hardware, and laptop management form the foundation for building further technical programming skills. Learn to configure your laptop environment, basic PC and troubleshoot problems. Students create backups, install virus protection, and manage files through a basic understanding of the Windows Operating System. Students also install and configure the Windows Operating System, and a virtual machine environment and explore computer organization including basic numerical systems, functional hardware and software components needed to run programs." 
         },
         {
            courseName: "Web Programming",
            level: 2,
            image: "img/web programming.jpg", 
            description: "The World Wide Web (WWW) has become an integrated part of everyday life. Students develop basic skills of web programming, website design and implementation. JavaScript, HTML5, and PHP are used to explore web-based solutions to problems of increasing interactivity and complexity. Lectures are reinforced by practical assignments that encourage students to construct and maintain their own websites."
         },
    ],
};

// using a loop to display all the courses 
// the general plan for the display should be: 
// card dive => image div + info div + course-description div (no display)
for(let i of courses.data){
    // create a div for course cards
    let card = document.createElement("div");

    // add the class to card <div> 
    card.classList.add("card", i.level);

    // create a div for image
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");

    // in the imgContainer, make tag and pass in the image src
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer); // append img container to card 

    // crate a div for information of the course
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    
    // inside the div, make h5 name 
    let name = document.createElement("h5");
    name.classList.add("course-name");
    name.innerHTML = i.courseName;
    infoContainer.appendChild(name); // append h5 to the infoContainer

    // inside the div, make h6 level 
    let level = document.createElement("h6");
    level.classList.add("course-level");
    level.innerHTML = "Level " + i.level;
    infoContainer.appendChild(level); // append level to the infoContainer
    
    // append infoContainer to the card
    card.appendChild(infoContainer); 

    // store the course description into a <p> and append it to the card, no display, to be used later with lightbox
    let text = document.createElement("p");
    text.classList.add("course-description");
    text.innerHTML = i.description;
    card.appendChild(text);

    // add card to the gallery
    document.getElementById("course-gallery").appendChild(card);

}

// lightbox: click and display course info on a grey background
const lightbox = document.createElement("div");
lightbox.setAttribute("id", "lightbox");
document.body.appendChild(lightbox);

let cards = document.getElementsByClassName("card");
// loop through the cards to add event listener for click and display 
for(let i = 0; i < cards.length; i++){
    let info = document.querySelectorAll(".course-description");
    cards[i].addEventListener("click", function(){
        // alert(info[i].innerHTML);
        let description = document.createElement("div");
        description.classList.add("lightbox-info");
        description.innerHTML = info[i].innerHTML;

        // only allow lightbox to have one child (description for only one course), always remove the first child if has any
        while(lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(description);
        lightbox.classList.add("active");
    })
}

// click again to remove the lightbox
lightbox.addEventListener("click", function(e){
    // when the info part is clicked the lightbox wont go away
    if(e.target !== e.currentTarget){
        return;
    }
    lightbox.classList.remove("active");
});


// search course!!!!!
document.getElementById("search").addEventListener("click", function(){

    // get user input: course name 
    let searchInput = document.getElementById("searchbox").value;
    let elements = document.querySelectorAll(".course-name");
    let cards = document.querySelectorAll(".card");

    // loop through all elements 
    elements.forEach((element, index) => {
        let el = element.innerText.toLowerCase();
        let user = searchInput.toLowerCase();
        
        if(!el.includes(user)){
            cards[index].classList.add("hide");
        }
        else{
            cards[index].classList.remove("hide"); // important to add the else condition, otherwise the hidden result from the first search will stay hide with the second search 
        }
    });
});

// sort courses!!!!

// 1. Display All button: reload page
document.getElementById("button-all").addEventListener("click", function(){
    window.location.reload();
});

// 2. Display only level 1
document.getElementById("button-level01").addEventListener("click", function(){
    let elements = document.querySelectorAll(".course-level");
    let cards = document.querySelectorAll(".card");


    elements.forEach((element, index) => {
        // console.log(element.innerText); // level 1 or level 2

        if(element.innerText != "Level 1"){
            cards[index].classList.add("hide");
        }
        else{
            cards[index].classList.remove("hide");
        }
    })
});

// 3. Display only level 2
document.getElementById("button-level02").addEventListener("click", function(){
    let elements = document.querySelectorAll(".course-level");
    let cards = document.querySelectorAll(".card");

    elements.forEach((element, index) => {
        // console.log(element.innerText); // level 1 or level 2

        if(element.innerText != "Level 2"){
            cards[index].classList.add("hide");
        }
        else{
            cards[index].classList.remove("hide");
        }
    })
});

// 4. sort from level 1 to level 2
document.getElementById("button-up").addEventListener("click", function(){
    let elements = document.querySelectorAll(".course-level");
    let cards = document.querySelectorAll(".card");
    let sorted = []; // make a new array with the index of the courses sorted according to level number
    
    let gallery = document.getElementById("course-gallery");

    // put level 1 in the beginning, put level 2 at the end.
    elements.forEach((element, index) => {
        let num = element.innerText.split(' ')[1]; // get the level number
        console.log(num);

        if(num == 1){
            sorted.unshift(index);
        }
         
        if(num == 2){
            sorted.push(index);
        }

        gallery.removeChild(cards[index]); // remove all the cards first 
        cards[index].classList.remove("hide"); // if dont remove the class hide first, later it will only display what's not hidden at the moment
    });

    // display the cards accoring to the index array
    for(let i = 0; i < sorted.length; i++){
        gallery.appendChild(cards[sorted[i]]); // append cards with new order
    }
    // console.log(sorted);
});

// 5. sort from level 2 to level 1
document.getElementById("button-down").addEventListener("click", function(){
    let elements = document.querySelectorAll(".course-level");
    let cards = document.querySelectorAll(".card");
    let sorted = [];
    
    let gallery = document.getElementById("course-gallery");

    // put level 1 in the beginning, put level 2 at the end.
    elements.forEach((element, index) => {
        let num = element.innerText.split(' ')[1]; // get the level number
        console.log(num);

        if(num == 1){
            sorted.push(index);
        }
         
        if(num == 2){
            sorted.unshift(index);
        }

        gallery.removeChild(cards[index]); // remove all the cards first 
        cards[index].classList.remove("hide");
    });

    // display the cards accoring to the index array
    for(let i = 0; i < sorted.length; i++){
        document.getElementById("course-gallery").appendChild(cards[sorted[i]]);
    }
    console.log(sorted);

});


