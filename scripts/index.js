showNotes();

document.getElementById("addBtn").addEventListener("click", function () {
  let addText = document.getElementById("addText");
  let addTitle=document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj={
    title:addTitle.value,
    text:addText.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  addTitle.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add Note" section above to add notes`;
  }
}

function deleteNode(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
