/**
 * Creates a collapsible individual task item.
 */
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

/** 
 * Only for mobile screens. Sets the listener for the open button so it opens smoothly.
*/  
export function setOpenMenuListener()
{
    let openBtn = document.querySelector(".open-menu-span");
    let contentContainer=document.querySelector(".content");
    let listMenu=document.querySelector(".list-menu");
    openBtn.addEventListener("click", () => {
        openBtn.style.display="none";
        contentContainer.style.gridTemplateRows="100% 0";
        listMenu.style.display="block";
    });
}

//Only for mobile screens. Sets the listener for the close button so it closes smoothly. 
export function setMenuCloseListener()
{
    let openBtn = document.querySelector(".open-menu-span");
    let contentContainer=document.querySelector(".content");
    let listMenu=document.querySelector(".list-menu");
    let closeBtn=document.querySelector(".closebtn");

    closeBtn.addEventListener("click", () => {
        
        contentContainer.style.gridTemplateRows="5% 95%";
        
        //use setTimeout for smooth transition set in stylesheet
        setTimeout(() => {listMenu.style.display="none"},1000);
        setTimeout(() => {
            openBtn.style.display="";
            openBtn.style.paddingTop="5px"; 
    },1000);
    })
}

/**
 * Clears inline styles set by the mobile view. 
 * Fixes style distortion when resizing page in browser after switching to mobile view and back to full size.
 */
export function setInlineCssListener()
{
    let openBtn = document.querySelector(".open-menu-span");
    let listMenu=document.querySelector(".list-menu");
    let contentContainer=document.querySelector(".content");

    window.addEventListener("resize", ()=>{
        let width  = window.innerWidth || document.documentElement.clientWidth || 
        document.body.clientWidth;
        let height = window.innerHeight|| document.documentElement.clientHeight|| 
        document.body.clientHeight;
        if(width>601)
        {
            openBtn.removeAttribute("style");
            listMenu.removeAttribute("style");
            contentContainer.removeAttribute("style");
        }
    });
}