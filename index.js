let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    console.log(myLeads);
}

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const containerEl = document.getElementById("container");
const inputBtn = document.getElementById("input-btn");
const deleteAllBtn = document.getElementById("deleteAll-btn");
const tabBtn = document.getElementById("tab-btn");

render("myLeads");

//save input - button
inputBtn.addEventListener("click", function () {
    if (inputEl.value) { // trythy - value isn't null or empty ("")
        myLeads.push(inputEl.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        console.log(localStorage.getItem("myLeads"));
    } else {
        console.log("Type a value!");
    }
    render("myLeads");
    inputEl.value = "";
})

//save tab - btn
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].url) { // trythy - value isn't null or empty ("")
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            console.log(`Saved value: ${tabs[0].url}`);
        } else {
            console.log("Failed");
        }
        render("myLeads");
    })

})

// render the list of items
function render(_array) {
    const fromStorage = JSON.parse(localStorage.getItem(_array));
    var listItems = "";
    if (fromStorage) { // if truthy - do for loop
        for (let i = fromStorage.length - 1; i >= 0; i--) {
            listItems += `
            <li >
                <a target='_blank' href='${fromStorage[i]}'>
                    ${fromStorage[i]}
                </a>
            </li>
            `;
        }
    } else { // else - false(null)
        listItems = `
        <li>
            Empty list!
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

//detele All - button - double click
deleteAllBtn.addEventListener("dblclick", function () {
    const fromStorage = JSON.parse(localStorage.getItem("myLeads"));
    if (fromStorage) { // trythy - value isn't null or empty ("")
        localStorage.clear();
        myLeads = []
        console.log("Deleted!");
    } else {
        console.log("It's empty!");
    }
    //ulEl.innerHTML
    render("myLeads");
})


//detele a specific elem
// function delElem(id) {
//     myLeads = JSON.parse(localStorage.getItem("myLeads"));
//     if (myLeads) { // trythy - value isn't null or empty ("")
//         myLeads.splice(id, 1);
//         localStorage.setItem("myLeads", JSON.stringify(myLeads));
//         console.log("Element deleted!");
//     } else {
//         console.log("It's empty!");
//     }
//     render("myLeads");
// }
