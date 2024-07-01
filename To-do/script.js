const inputBox = document.getElementById("input-b");
const listcontainer = document.getElementById("list-cont");
const taskStats = document.getElementById("task-stats");
const completedPercent = document.getElementById("completed-percent");

console.log(listcontainer);

document.getElementById("b").addEventListener("click", addTask);

addEventListener("keydown",(e)=>{
    if (e.key == "Enter"){
        addTask()
    }
})

function addTask(){
    if (inputBox.value == ""){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
      

        let span = document.createElement("span")
        span.innerHTML = "<i  class = 'fa-solid fa-trash'></i>"
        li.appendChild(span)
        listcontainer.appendChild(li)

        updateTaskStats();
    }
    inputBox.value ="";
    saveData();
}

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML)
}

listcontainer.addEventListener("click",(e)=>{
  if (e.target.tagName.toUpperCase() == "LI"){
    e.target.classList.toggle("checked")
   
    saveData()
    updateTaskStats();
  }else if(e.target.tagName.toUpperCase() == "I") {
      e.target.parentElement.parentElement.remove()
      saveData()
    updateTaskStats();

  }
})

function showTask()
{
    listcontainer.innerHTML = localStorage.getItem("data");
    updateTaskStats();
}
showTask();

function updateTaskStats() {
    const tasks = listcontainer.querySelectorAll("li");
    const totalTasks = tasks.length;
    const completedTasks = listcontainer.querySelectorAll("li.checked").length;
    const completedPercentage = totalTasks === 0 ? 0 : Math.round(((completedTasks) / totalTasks) * 100);

    taskStats.innerHTML = `${completedTasks}/${totalTasks}`;
    completedPercent.textContent = `${completedPercentage}% Complete`;

   
}