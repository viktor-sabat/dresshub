import { defaultGarmentsData } from "./garments.js";

let garmentsData = JSON.parse(localStorage.getItem('garmentsData'));

if (!garmentsData) {
  // If 'garmentsData' doesn't exist in local storage, set default data
  localStorage.setItem('garmentsData', JSON.stringify(defaultGarmentsData));
  garmentsData = defaultGarmentsData;
}

/*
 * Generates a unique ID based on the current timestamp.
 * 
 * Parameters:
 *   - None
 * 
 * Preconditions:
 *   - None
 * 
 * Postconditions:
 *   - A unique identifier (timestamp-based) has been generated.
 *   - The generated ID is ready for use.
 * 
 * Returns:
 *   A unique identifier (timestamp-based) as a number.
 * 
 * Example:
 *   const uniqueId = generateUniqueId();
 */
function generateUniqueId() {
    return Date.now(); // Using the current timestamp as a simple example
}


/*
 * Adds a div that represents a garment to the HTML structure.
 * 
 * Parameters:
 *   - garment: Object with brand, name, and imgUrl properties.
 *   - isActive: Boolean variable that indicates whether the garment should be hidden based on the filters that are currently selected.
 * 
 * Preconditions:
 *   - The 'garment-grid' container must exist.
 * 
 * Postconditions:
 *   A new garment element has been added to the 'garment-grid'.
 */

function addGarmentToPage(garment, isActive = false) {
    const container = document.querySelector('.garment-grid');
    const garmentElement = document.createElement('div');
    garmentElement.classList.add('garment');
    garmentElement.classList.add(garment.type);
    
    // If the garment is active it means that its type is the same as the one of the currently selected filter (top, bottom, hat...)
    // So it shall be activated 
    if(isActive){
        garmentElement.classList.add('garment--active');
    }
  
    garmentElement.innerHTML = `
        <button type="button" class="garment__delete">
            <img src="./img/close.png" alt="" class="button__delete-logo">
        </button>
        <img src="${garment.imgUrl}" alt="" class="garment__img">
        <div class="garment__content">
            <h2 class="garment__brand">${garment.brand}</h2>
            <p class="garment__name">${garment.name}</p>   
        </div>
    `;

    // Set the unique ID as the HTML element's id attribute
    garmentElement.id = garment.id;

    // Add hover events for the newly created garment
    garmentElement.addEventListener('mouseenter', () => {
        garmentElement.querySelector('.garment__delete').style.display = 'block';
    });

    garmentElement.addEventListener('mouseleave', () => {
        garmentElement.querySelector('.garment__delete').style.display = 'none';
    });
  
    container.insertBefore(garmentElement, container.firstChild);
  }


/*
 * Renders a list of garments by adding each garment to the HTML structure.
 * 
 * Parameters:
 *   - garments: An array of objects, each representing a garment with brand, name, and imgUrl properties.
 * 
 * Preconditions:
 *   - The 'garment-grid' container must exist.
 * 
 * Postconditions:
 *   - Each garment in the 'garments' array has been added to the 'garment-grid'.
 */

function renderGarments(garments){
    for(let i = garments.length - 1; i >= 0; i--){
        addGarmentToPage(garments[i]);
    }
}


/*
 * Creates a new garment object based on the user input from the add garment form.
 * 
 * Parameters:
 *   - None
 * 
 * Preconditions:
 *   - The 'add-garment-form' must exist in the HTML structure.
 * 
 * Postconditions:
 *   - A new garment object has been created using the form input.
 *   - The new garment object is ready for addition to both the HTML structure and the array of garments.
 */

function createAndAddGarmentToArray() {
    const form = document.querySelector('.add-garment-form'); 

    const newGarmentBrand = form.querySelector('.form__brand').value;
    const newGarmentName = form.querySelector('.form__garment').value;
    const newGarmentPhotoLink = form.querySelector('.form__photo-link').value;
    const newGarmentType = form.querySelector('.form__type').value;

    const newGarmentID = generateUniqueId();

    const newGarmentObject = {
        id: newGarmentID,
        brand: newGarmentBrand,
        name: newGarmentName,
        imgUrl: newGarmentPhotoLink,
        type: newGarmentType
    };

    // Check if the current filters require the newly created garment to be displayed
    let isGarmentActive = false;

    // If the selected filter is 'all' or the same as the one of the garment, the garment shall be activated
    if(activeFilters.includes('all') || activeFilters.includes(newGarmentType)){
        isGarmentActive = true;
    }

    // Adding the new garment object to the HTML structure
    addGarmentToPage(newGarmentObject, isGarmentActive);

    // Adding the new garment as the first element in the array of garments
    garmentsData.unshift(newGarmentObject); 

    // Deleting the old array of garments from the local storage
    localStorage.removeItem('garmentsData');
    localStorage.setItem('garmentsData', JSON.stringify(garmentsData));
}


/*
 * Handles the form submission event for adding a new garment.
 * 
 * Parameters:
 *   - event: The form submission event.
 * 
 * Preconditions:
 *   - The 'add-garment-form' must exist in the HTML structure.
 *   - The 'createAndAddGarmentToArray' function is defined.
 * 
 * Postconditions:
 *   - The form submission event is prevented from its default behavior.
 *   - The 'createAndAddGarmentToArray' function is called to handle the addition of a new garment.
 */
function handleAddGarmentFormSubmit(event){
    event.preventDefault();

    createAndAddGarmentToArray();
    modalOverlay.style.display = 'none'; 
}

/* 
 * Deletes a garment.
 * 
 * Parameters:
 *   - garmentID: The unique ID of the garment to be deleted.
 * 
 * Preconditions:
 *   - The 'garment-grid' container must exist.
 * 
 * Postconditions:
 *   - The specified garment has been removed from both the HTML structure and the array of garments.
 */
function deleteGarment(garmentID){
    const garmentForDeletion = document.getElementById(garmentID);
    garmentForDeletion.remove();

    // Deleting the garment from the array of garments
    garmentsData = garmentsData.filter(garment => garment.id != garmentID);

    // Updating the array of garments in the local storage
    localStorage.setItem('garmentsData', JSON.stringify(garmentsData));
}


// Array to keep track of active filters
let activeFilters = ['all'];

/*
 * Activates or deactivates a filter button and manages garment visibility based on the selected filter.
 * 
 * Parameters:
 *   - filterButton: The HTML element representing the filter button.
 *   - garmentType: The type of garment to filter (e.g., 'all', 'top', 'bottom', etc.).
 * 
 * Preconditions:
 *   - The filter buttons must have the 'filters__button' class.
 *   - The 'active' class is used to indicate the active state of a filter button.
 *   - The garment grid container must exist.
 * 
 * Postconditions:
 *   - The selected filter button is activated or deactivated.
 *   - Garments are displayed or hidden based on the selected filter.
 */
function activateFilterButton(filterButton, garmentType) {
    // Check if the filter button is already active
    if (filterButton.classList.contains('active')) {
        // If active, deactivate it by removing the 'active' class
        filterButton.classList.remove('active');
        // Deactivate all garments of the current type
        deactivateGarmentsWithType(garmentType);

        // Remove the garmentType from the activeFilters array
        activeFilters = activeFilters.filter(item => item !== garmentType);
    }
    // If the filter button is not active, activate it
    else {
        // Check if the filter being activated is not the 'All' filter
        if (!filterButton.classList.contains('filters__all')) {
            // If 'All' filter is active, deactivate all garments
            if (document.querySelector('.filters__all').classList.contains('active')) {
                deactivateGarmentsWithType('all');

                // Remove 'all' from the activeFilters array
                activeFilters = activeFilters.filter(item => item !== 'all');
            }
            // Deactivate 'All' filter button
            document.querySelector('.filters__all').classList.remove('active');
        }
        // If 'All' filter button is being activated
        else {
            // Remove 'active' class from all filter buttons
            const filterButtons = document.querySelectorAll('.filters__button');
            filterButtons.forEach(button => {
                button.classList.remove('active');
            });
            // Deactivate all garments
            deactivateGarmentsWithType('all');

            // Clear the activeFilters array since 'All' is activated
            activeFilters = [];
        }
        // Add the 'active' class to the filter button being activated
        filterButton.classList.add('active');
        // Activate garments of the selected type
        activateGarmentsWithType(garmentType);

        // Add the newly activated garmentType to the activeFilters array
        activeFilters.push(garmentType);
    }
}


/* 
 * Activates garments of a specific type and deactivates others.
 * 
 * Parameters:
 *   - garmentType: The type of garment to activate (e.g., 'all', 'top', 'bottom', etc.).
 * 
 * Preconditions:
 *   - The garment grid container must exist.
 * 
 * Postconditions:
 *   - Garments are displayed or hidden based on the selected garment type.
 */
function activateGarmentsWithType(garmentType) {
    if (garmentType == 'all') {
        const garments = document.querySelectorAll('.garment');
        garments.forEach(garment => {
            if (!garment.classList.contains('garment--active')) {
                garment.classList.add('garment--active');
            }
        });
    } else {
        const garments = document.querySelectorAll('.' + garmentType);
        garments.forEach(garment => {
            if (!garment.classList.contains('garment--active')) {
                garment.classList.add('garment--active');
            }
        });
    }
}


/* 
 * Deactivates garments of a specific type and activates others.
 * 
 * Parameters:
 *   - garmentType: The type of garment to deactivate (e.g., 'all', 'top', 'bottom', etc.).
 * 
 * Preconditions:
 *   - The garment grid container must exist.
 * 
 * Postconditions:
 *   - Garments are displayed or hidden based on the selected garment type.
 */
function deactivateGarmentsWithType(garmentType) {
    if (garmentType == 'all') {
        const garments = document.querySelectorAll('.garment');
        garments.forEach(garment => {
            garment.classList.remove('garment--active');
        });
    } else {
        const garments = document.querySelectorAll('.' + garmentType);
        garments.forEach(garment => {
            garment.classList.remove('garment--active');
        });
    }
}


// ==============================================================
// Rendering Garments
// ==============================================================
renderGarments(garmentsData);

const garmentsToBeActivated = document.querySelectorAll('.garment');
garmentsToBeActivated.forEach(garment => {
    garment.classList.add('garment--active');
})


// ==============================================================
// Modal Overlay Logic
// ==============================================================
const addGarmentButton = document.querySelector('.add-garment-button');
const modalOverlay = document.querySelector('.modal-overlay');
const formCloseButton = document.querySelector('.form__close');

// Show the modal on 'Add Garment' button click
addGarmentButton.addEventListener('click', () => {
    // Reset the form fields
    document.querySelector('.add-garment-form').reset();

    // Show the modal
    modalOverlay.style.display = 'flex';
});

// Close the modal when clicking the close button
formCloseButton.addEventListener('click', () => {
    // Hide the modal
    modalOverlay.style.display = 'none'; 
});


// ==============================================================
// Garment Deletion Logic
// ==============================================================
document.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if(clickedElement.classList.contains('garment__delete') || clickedElement.classList.contains('button__delete-logo')){
        const clickedDeleteGarmentButton = clickedElement.classList.contains('garment__delete') 
        ? clickedElement 
        : clickedElement.closest('.garment__delete');

        const garmentID = clickedDeleteGarmentButton.parentElement.id;
        
        deleteGarment(garmentID);
    }
});


// ==============================================================
// Event Listener for Adding a New Garment
// ==============================================================
const form = document.querySelector('.add-garment-form');
form.addEventListener('submit', handleAddGarmentFormSubmit);


// ==============================================================
// Filter Button Activation Logic
// ==============================================================

const allFilter = document.querySelector('.filters__all');
allFilter.addEventListener('click', () => activateFilterButton(allFilter, 'all'));

const topsFilter = document.querySelector('.filters__tops');
topsFilter.addEventListener('click', () => activateFilterButton(topsFilter, 'top'));

const bottomsFilter = document.querySelector('.filters__bottoms');
bottomsFilter.addEventListener('click', () => activateFilterButton(bottomsFilter, 'bottom'));

const socksFilter = document.querySelector('.filters__socks');
socksFilter.addEventListener('click', () => activateFilterButton(socksFilter, 'socks'));

const hatsFilter = document.querySelector('.filters__hats');
hatsFilter.addEventListener('click', () => activateFilterButton(hatsFilter, 'hat'));

const outwearFilter = document.querySelector('.filters__outwear');
outwearFilter.addEventListener('click', () => activateFilterButton(outwearFilter, 'outwear'));

const footwearFilter = document.querySelector('.filters__footwear');
footwearFilter.addEventListener('click', () => activateFilterButton(footwearFilter, 'footwear'));
