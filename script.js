//part 1 step 1
let body = document.querySelector('body')

// 1 Select and cache the <main>
let mainEl = document.querySelector('main')
// 2 Set the background color of mainEl
mainEl.style.backgroundColor = 'var(--main-bg)'
// 3 Set the content of mainEl to <h1>DOM Manipulation</h1>
// let h1 = document.createElement('h1')
mainEl.innerHTML = '<h1>DOM Manipulation</h1>'
// 4 Add a class of flex-ctr to mainEl
mainEl.classList.add('flex-ctr')

body.appendChild(mainEl)


//PART 1 step 2 

// 1 Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById('top-menu')
// 2 Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height="100%"
// 3 Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
// 4 Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around')



//PART 1 step 3 

// 1 Iterate over the entire menuLinks array and for each "link" object:
var menuLinks = [// updated menuLinks for part 2 
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

menuLinks.forEach((item, index, array)=>{
    const newAnchorTag = document.createElement('a')
    newAnchorTag.href = item.href
    newAnchorTag.textContent = item.text
    topMenuEl.appendChild(newAnchorTag)
});

//begin DOM manipulation part 2 assignment

//PART 3 STEP 1 :Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById("sub-menu")

//PART 3 STEP 2: Set the height subMenuEl element to be "100%".
subMenuEl.style.height = "100%"

//PART 3 STEP 3:Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'

//PART 3 STEP 4:Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around')
//console.log(subMenuEl)

/*Now, change the position of the submenu to temporarily hide it. Later, we will make the submenu appear dynamically based on user interaction:

//PART 3 EXTRA STEP 1 :Set the CSS position property of subMenuEl to the value of absolute.*/
subMenuEl.style.position ='absolute'

//PART 3 EXTRA STEP 2 :Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = 0 // im guessing this hid the second submenu bar from view

//PART 4: ADDING MENU INTERACTION
//PART 4 STEP 1: Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
let topMenuLinks = topMenuEl.querySelectorAll('a')// instead of accessing the whole document, we need to access the menulinks and use querySelectorAll because there is more than 1 
console.log(topMenuLinks)


//PART 4 STEP 2: Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click',function(event){
  //PART 4 STEP 2.1:The first line of code of the event listener function should call the event object's preventDefault() method.
event.preventDefault()
//PART 4 STEP 2.2: The second line of code of the function should immediately return if the element clicked was not an <a> element.
 if (event.target.tagName!== "A") return;// what is this returning exactly? and apparently there is a js rule that this has to be caps for some reason 

//PART 4 STEP 2.3: Log the content of the <a> to verify the handler is working.
console.log(event.target.textContent) // will return catalog, and the other headers 

//PART 5
// Within the same event listener, we want to TOGGLE the submenu between active and non-active states. First, we will set the submenu to show or hide itself depending on the menu state:
//  Within the event listener, IF the clicked <a> element does not yet have a CLASS of "active" (it was inactive when clicked):If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), 

// PART 5 STEP 1a: set the CSS top property of subMenuEl to 100%.  // i got help with this part. im taking more time to understand.
//  PART 5 STEP 1b:Otherwise, set the CSS top property of subMenuEl to 0.

for( let links of menuLinks){
  console.log(links.text)
  if (links.text === event.target.textContent){ 
  if (links.subLinks){
    subMenuEl.style.top = "100%" // should show submenu?
    buildSubmenu(links.subLinks)
  }else{
  subMenuEl.style.top = "0%"// hides menu
}
}
}
// Hint: Caching the "link" object will come in handy for passing its subLinks array later.
})

//PART 5 STEP 2:
/* The submenu needs to be dynamic based on the clicked link. To facilitate that, we will create a helper function called buildSubmenu that does the following:
 Clear the current contents of subMenuEl.
 Iterate over the subLinks array, passed as an argument, and for each "link" object:*/
function buildSubmenu(subLinks){
subMenuEl.innerHTML= " " // clears
for(subLink of subLinks){
  //PART 5 STEP 2a: Create an <a> element.
  let a = document.createElement("a")
  //PART 5 STEP 2b:Add an href attribute to the <a>, with the value set by the href property of the "link" object.
  a.href = subLink.href 
  //PART 5 STEP 2c:Set the element's content to the value of the text property of the "link" object.
  a.textContent = subLink.text
  //PART 5 STEP 2d:Append the new element to the subMenuEl.
  subMenuEl.appendChild(a)
}
}



// Once you have created your helper function, include it in the event listener within the same logic that shows the submenu, remembering to pass the array of sub-links as an argument. SEE LINE 88

//PART 5 STEP 3:
//PART 5 STEP 3.1: Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener("click", function(event){
// The first line of code of the event listener function should call the event object's preventDefault() method.
event.preventDefault()
// The second line of code within the function should immediately return if the element clicked was not an <a> element.
if(event.target.tagName !== "A") return;
// Log the content of the <a> to verify the handler is working.
console.log(event.target.textContent)
//PART 5 STEP 3.2: Next, the event listener should set the CSS top property of subMenuEl to 0.
subMenuEl.style.top ="0"
//PART 5 STEP 3.3: Remove the active class from each <a> element in topMenuLinks.
for (let link of topMenuLinks) {
        link.classList.remove("active"); // Remove active class
    }

//PART 5 STEP 3.4: Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
 mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
 
//PART 5 STEP 3.5:If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
})



// PART 6: Completion and Code Review
// Test your menu! If it works in a way that makes sense, you have likely been successful. Your instructor has been provided with a completed version of this assignment, and time permitting, will do a brief code review so that you can make comparisons with your own approaches.
// Remember, functionality is key! There are many ways to arrive at the same solution in development, and often the difference in syntax between two solutions is inconsequential. If it works, good job!
// Remember to submit the link to this part of the project to Canvas using the submission instructions at the beginning of this document.


