export function setCollapsibleContent ()
{
    let taskButtons=Array.from(document.getElementsByClassName("collapsible-task-button"));

    for (let i=0; i< taskButtons.length; i++)
    {
        taskButtons[i].addEventListener("click", function()
        {
            this.classList.toggle("active");
            let taskDetails=this.nextElementSibling;
            if(taskDetails.style.maxHeight) 
            {
                taskDetails.style.maxHeight=null;
            }
            else 
            {
                taskDetails.style.maxHeight = taskDetails.scrollHeight+"px";
            }
        });
    }
}