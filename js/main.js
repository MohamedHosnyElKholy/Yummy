$('.open-close-icon').click(() => {
    $('.open-close-icon').toggleClass('fa-align-justify fa-times');
    $('.side-nav-menu').toggleClass('toggle')
    $('.sidebar').toggleClass('sideTogg')
})
$(document).ready(() => {
    async function getThe() {
        let cartona = '';
        let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
        let detailJson = await fetch_details.json();
        let meals = detailJson.meals;

        meals.forEach(element => {

            cartona += `
                <div class="col-md-3">
                    <div class="all-content all">
                        <div class="images">
                            <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
                            <div class="content-al">
                                <h3 class="p-3 rounded-3">${element.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelector('.one').innerHTML = cartona;

        // Add click event listener to each '.all-content' element
        let allContentElements = document.querySelectorAll('.all-content');
        allContentElements.forEach((content, index) => {
            content.addEventListener('click', () => {
                document.querySelector('.one').classList.add('d-none');
                detialsData(meals[index].idMeal); // Pass idMeal to detialsData
            });
        });
    }
    getThe();
})

async function detialsData(mealId) {
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let detailJson = await fetch_details.json();
    let meal = detailJson.meals[0];
    cartona += `
                    <div class="col-md-4">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="">
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${meal.strInstructions}</p>
                        <p class="text-white fw-bold">Area : ${meal.strArea}</p>
                        <p class="text-white fw-bold">Category : ${meal.strCategory}</p>
                        <p class="text-white fw-bold">Recipes : <br>
                        <ul class="d-flex align-items-center flex-wrap mb-3">
                                        ${(() => {
            let ingredientsList = '';
            for (let i = 1; i <= 20; i++) {
                let ingredient = meal[`strIngredient${i}`];
                let measure = meal[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
                    ingredientsList += `<li class="m-2 p-2 list-into rounded-2">${measure.trim()} ${ingredient.trim()}</li>`;
                }
            }
            return ingredientsList;
        })()}
                        </ul>
                        </p>
                        <p class="text-white fw-bold m-2 p-2">Tags : <br></p>
                        <div class="m-2 p-2 tags rounded-2">${meal.strTags == null ? 'No Tags' : meal.strTags}</div>
                        <a href="${meal.strSource}" class="srce text-white rounded-2">Source</a>
                        <a href="${meal.strYoutube}" class="yot text-white rounded-2">Youtube</a>
                </div>
        `
    document.querySelector('.oneDetials').innerHTML = cartona;
}

let search = document.querySelector('.search')
search.addEventListener('click', () => {
    document.querySelector('.one').classList.add('d-none');
    let cartona = '';
    cartona += `
            <input type="text" class="serName  form-control bg-transparent text-white" placeholder="Search By Name">
        <input type="text" class="serLetter  form-control bg-transparent text-white" placeholder="Search By First Letter" maxlength="1">
    `
    document.querySelector('.formation').innerHTML += cartona;
    document.querySelector('.serName').addEventListener('input', handellerSearch);
    document.querySelector('.serLetter').addEventListener('input', handellerSearchLetter);
})
async function handellerSearch(e) {
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    if (!meals) {
        cartona += `<p class="text-white fs-4 fw-bold mt-3 text-center">No meals found.</p>`
    } else {
        meals.forEach(element => {
            cartona += `
            <div class="col-md-3">
                <div class="all-content2 all">
                    <div class="images position-relative overflow-hidden">
                        <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
                        <div class="content-al top-0 d-flex align-items-center w-100 h-100 rounded-2">
                            <h3 class="p-3 rounded-3 heading-sp">${element.strMeal}</h3>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    }

    document.querySelector('.two').innerHTML = cartona;

    let allContentElements2 = document.querySelectorAll('.all-content2');
    allContentElements2.forEach((element, index) => {
        element.addEventListener('click', () => {
            document.querySelector('.formation').classList.add('d-none');
            document.querySelector('.two').classList.add('d-none');
            detialsData(meals[index].idMeal)
        })
    });
}

async function handellerSearchLetter(e) {
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    meals.forEach(element => {
        cartona += `
        <div class="col-md-3">
            <div class="all-content2 all">
                <div class="images position-relative overflow-hidden">
                    <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
                    <div class="content-al top-0 d-flex align-items-center w-100 h-100 rounded-2">
                        <h3 class="p-3 rounded-3 heading-sp">${element.strMeal}</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    document.querySelector('.two').innerHTML = cartona;
    let allContentElements2 = document.querySelectorAll('.all-content2');
    allContentElements2.forEach((element, index) => {
        element.addEventListener('click', () => {
            document.querySelector('.formation').classList.add('d-none');
            document.querySelector('.two').classList.add('d-none');
            detialsData(meals[index].idMeal)
        })
    });
}
let categories = document.querySelector('.categories');
categories.addEventListener('click', async () => {
    document.querySelector('.one').classList.add('d-none');
    document.querySelector('.formation').classList.add('d-none');
    document.querySelector('.two').classList.add('d-none');
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.categories;
    meals.forEach(element => {
        cartona += `
        <div class="col-md-3">
            <div class="all-content2 all text-center">
                <div class="images position-relative overflow-hidden">
                    <img src="${element.strCategoryThumb}" class="w-100 rounded-2" alt="">
                    <div class="content-al top-0 d-flex align-items-center flex-column w-100 h-100 rounded-2">
                    <h3 class="m-1">${element.strCategory}</h3>
                        <p class="p-3 h-100 rounded-3 heading-sp">${element.strCategoryDescription.split(' ').slice(0, 7).join(' ')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    document.querySelector('.catgory').innerHTML = cartona;
    document.querySelectorAll('.all-content2 ').forEach((ele, index) => {
        ele.addEventListener('click', () => {
            let strCatgory = meals[index].strCategory;
            filterbyCategory(strCatgory)
        })
    })
})
async function filterbyCategory(strCatgory) {
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCatgory}`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    meals.forEach(element => {
        cartona += `
        <div class="col-md-3">
            <div class="all-content all news">
                <div class="images position-relative overflow-hidden">
                    <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
                    <div class="content-al top-0 d-flex align-items-center w-100 h-100 rounded-2">
                        <h3 class="p-3 h-100 rounded-3 heading-sp">${element.strMeal}</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    document.querySelector('.catgory').innerHTML = cartona;
    let allContentElements3 = document.querySelectorAll(".news");
    allContentElements3.forEach((element, index) => {
        element.addEventListener('click', () => {
            document.querySelector('.catgory').classList.add('d-none');
            detialsData(meals[index].idMeal)
        })
    });
}
let area = document.querySelector('.area');
area.addEventListener('click', async () => {
    document.querySelector('.one').classList.add('d-none');
    document.querySelector('.formation').classList.add('d-none');
    document.querySelector('.two').classList.add('d-none');
    document.querySelector('.catgory').classList.add('d-none');

    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    meals.forEach(element => {
        cartona += `
                 <div class="col-md-3">
                <div class="all-content all allArea">
                    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                    <h3 class="text-white fw-bold">${element.strArea}</h3>
                </div>
            </div>
        `
    });
    document.querySelector('.areaa').innerHTML = cartona;
    let allArea = document.querySelectorAll('.allArea');
    allArea.forEach((element, index) => {
        element.addEventListener('click', () => {
            let strArea = meals[index].strArea;
            filterbyArea(strArea)
        })
    });
})
async function filterbyArea(strArea) {
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    meals.forEach(element => {
        cartona += `
        <div class="col-md-3">
            <div class="all-content all allAreaDet">
                <div class="images position-relative overflow-hidden">
                    <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
                    <div class="content-al top-0 d-flex align-items-center w-100 h-100 rounded-2">
                        <h3 class="p-3 h-100 rounded-3 heading-sp">${element.strMeal.split(' ').slice(0, 7).join(' ')}</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    document.querySelector('.areaa').innerHTML = cartona;
    let allAreaDet = document.querySelectorAll('.allAreaDet');
    allAreaDet.forEach((element, index) => {
        element.addEventListener('click', () => {
            document.querySelector('.areaa').classList.add('d-none');
            detialsData(meals[index].idMeal)
        })
    });
}
let ingredients = document.querySelector('.ingredients');
ingredients.addEventListener('click', async () => {
    document.querySelector('.one').classList.add('d-none');
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    let meals20 = meals.slice(0, 20);
    meals20.forEach(ele => {
        cartona += `
        <div class="col-md-3">
            <div class="all-content all ingreds text-center">
                <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                <h3 class="text-white fw-bold">${ele.strIngredient}</h3>
                <p class="text-white">${ele.strDescription.split(' ').slice(0, 7).join(' ')}</p>
            </div>
        </div>
    `;
    });
    document.querySelector('.ingred').innerHTML = cartona;
    let ingreds = document.querySelectorAll('.ingreds');
    ingreds.forEach((ingreds, index) => {
        ingreds.addEventListener('click', () => {
            let strIngreds = meals20[index].strIngredient;
            filterbymainingredient(strIngreds)
        })
    });
})
async function filterbymainingredient(strIngreds) {
    let cartona = '';
    let fetch_details = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngreds}`);
    let detailJson = await fetch_details.json();
    let meals = detailJson.meals;
    meals.forEach(element => {
        cartona += `
        <div class="col-md-3">
            <div class="all-content all filterionIngreads">
                <div class="images position-relative overflow-hidden">
                    <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
                    <div class="content-al top-0 d-flex align-items-center w-100 h-100 rounded-2">
                        <h3 class="p-3 h-100 rounded-3 heading-sp">${element.strMeal.split(' ').slice(0, 7).join(' ')}</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    document.querySelector('.ingred').innerHTML = cartona;
    let filterionIngreads = document.querySelectorAll('.filterionIngreads');
    filterionIngreads.forEach((element, index) => {
        element.addEventListener('click', () => {
            document.querySelector('.ingred').classList.add('d-none');
            document.querySelector('.one').classList.add('none');
            let idfilterationsingreads = meals[index].idMeal;
            detialsData(idfilterationsingreads);
        })
    });
}
let isNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;
let isAgeValid = false;
let isPasswordValid = false;
let isRePasswordValid = false;

let contact = document.querySelector('.contact');
contact.addEventListener('click', () => {
    let cartona = "";
    document.querySelector('.one').classList.add('d-none');
    document.querySelector('.formation').classList.add('d-none');
    document.querySelector('.two').classList.add('d-none');
    document.querySelector('.oneDetials').classList.add('d-none');
    document.querySelector('.catgory').classList.add('d-none');
    cartona += `
            <div class="col-md-6">
            <input type="text" placeholder="Enter Your Name" class="form-control name">
            <div class="alert w-100 mt-2 d-none messgeName"></div>
        </div>
        <div class="col-md-6">
            <input type="email" placeholder="Enter Your Email" class="form-control email">
            <div class="alert w-100 mt-2 d-none messgeEmail"></div>
        </div>
        <div class="col-md-6">
            <input type="text" placeholder="Enter Your Phone" class="form-control phone">
            <div class="alert w-100 mt-2 d-none messgePhone"></div>
        </div>
        <div class="col-md-6">
            <input type="number" placeholder="Enter Your Age" class="form-control num">
            <div class="alert w-100 mt-2 d-none messgeAge"></div>
        </div>
        <div class="col-md-6">
            <input type="password" placeholder="Enter Your Password" class="form-control pass">
            <div class="alert w-100 mt-2 d-none messgePass"></div>
        </div>
        <div class="col-md-6">
            <input type="password" placeholder="Enter Your RePassword" class="form-control repass">
             <div class="alert w-100 mt-2 d-none messgerePass"></div>
        </div>
        <button class="btn btn-outline-danger px-2 mt-3 m-auto" id="submitButton" disabled>Submit</button>
    `
    document.querySelector('.contact-us').innerHTML = cartona;

    document.querySelector('.name').addEventListener('input', validateName);
    document.querySelector('.email').addEventListener('input', validateEmail);
    document.querySelector('.phone').addEventListener('input', validatePhone);
    document.querySelector('.num').addEventListener('input', validateAge);
    document.querySelector('.pass').addEventListener('input', validatePassword);
    document.querySelector('.repass').addEventListener('input', validateRePassword);
})

function validateName() {
    let nameRegex = /^[a-zA-Z\s\-]+$/;
    let nameField = document.querySelector('.name');

    if (!nameRegex.test(nameField.value.trim())) {
        document.querySelector('.messgeName').classList.remove('d-none');
        document.querySelector('.messgeName').classList.add('alert-danger');
        document.querySelector('.messgeName').innerHTML = `Special characters and numbers not allowed`;
        isNameValid = false;
    } else {
        document.querySelector('.messgeName').classList.add('d-none');
        document.querySelector('.messgeName').classList.remove('alert-danger');
        isNameValid = true;
    }
    checkFormValidity();
}

function validateEmail() {
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    let emailField = document.querySelector('.email');

    if (!emailRegex.test(emailField.value.trim())) {
        document.querySelector('.messgeEmail').classList.remove('d-none');
        document.querySelector('.messgeEmail').classList.add('alert-danger');
        document.querySelector('.messgeEmail').innerHTML = `Email not valid *exemple@yyy.zzz`;
        isEmailValid = false;
    } else {
        document.querySelector('.messgeEmail').classList.add('d-none');
        document.querySelector('.messgeEmail').classList.remove('alert-danger');
        isEmailValid = true;
    }
    checkFormValidity();
}

function validatePhone() {
    let phoneRegex = /^[\d()+\-.\s]+$/;
    let phoneField = document.querySelector('.phone');

    if (!phoneRegex.test(phoneField.value.trim())) {
        document.querySelector('.messgePhone').classList.remove('d-none');
        document.querySelector('.messgePhone').classList.add('alert-danger');
        document.querySelector('.messgePhone').innerHTML = `Enter valid Phone Number`;
        isPhoneValid = false;
    } else {
        document.querySelector('.messgePhone').classList.add('d-none');
        document.querySelector('.messgePhone').classList.remove('alert-danger');
        isPhoneValid = true;
    }
    checkFormValidity();
}

function validateAge() {
    let ageRegex = /^[1-9]\d*$/;
    let ageField = document.querySelector('.num');

    if (!ageRegex.test(ageField.value.trim())) {
        document.querySelector('.messgeAge').classList.remove('d-none');
        document.querySelector('.messgeAge').classList.add('alert-danger');
        document.querySelector('.messgeAge').innerHTML = `Enter valid age`;
        isAgeValid = false;
    } else {
        document.querySelector('.messgeAge').classList.add('d-none');
        document.querySelector('.messgeAge').classList.remove('alert-danger');
        isAgeValid = true;
    }
    checkFormValidity();
}

function validatePassword() {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let passwordField = document.querySelector('.pass');

    if (!passwordRegex.test(passwordField.value.trim())) {
        document.querySelector('.messgePass').classList.remove('d-none');
        document.querySelector('.messgePass').classList.add('alert-danger');
        document.querySelector('.messgePass').innerHTML = `Enter valid password *Minimum eight characters, at least one letter and one number:*`;
        isPasswordValid = false;
    } else {
        document.querySelector('.messgePass').classList.add('d-none');
        document.querySelector('.messgePass').classList.remove('alert-danger');
        isPasswordValid = true;
    }
    checkFormValidity();
}

function validateRePassword() {
    let passwordField = document.querySelector('.pass');
    let rePasswordField = document.querySelector('.repass');

    if (passwordField.value.trim() !== rePasswordField.value.trim()) {
        document.querySelector('.messgerePass').classList.remove('d-none');
        document.querySelector('.messgerePass').classList.add('alert-danger');
        document.querySelector('.messgerePass').innerHTML = `Passwords do not match`;
        isRePasswordValid = false;
    } else {
        document.querySelector('.messgerePass').classList.add('d-none');
        document.querySelector('.messgerePass').classList.remove('alert-danger');
        isRePasswordValid = true;
    }
    checkFormValidity();
}

function checkFormValidity() {
    let submitButton = document.getElementById('submitButton');
    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRePasswordValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}
