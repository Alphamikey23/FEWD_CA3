document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.searchicon');
    const randomRecipeBtn = document.querySelector('.btn');
    const menuSection = document.querySelector('#menu');
    const randomGeneratorSection = document.querySelector('#random-generator');

    if (searchIcon && menuSection) {
        searchIcon.addEventListener('click', function() {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        console.error('Search icon or menu section not found.');
    }

    if (randomRecipeBtn && randomGeneratorSection) {
        randomRecipeBtn.addEventListener('click', async function() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await response.json();
                if (data.meals && data.meals.length > 0) {
                    const meal = data.meals[0];
                    
                    updateRandomRecipe(meal);
                    
                    randomGeneratorSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error('No meal found in response.');
                }
            } catch (error) {
                console.error('Error fetching random recipe:', error);
            }
        });
    } else {
        console.error('Random recipe button or random generator section not found.');
    }

    function updateRandomRecipe(meal) {
        const generatorTitle = document.querySelector('.generator-title');
        const generatorImage = document.querySelector('.generator-image img');
        const ingredientsList = document.querySelector('.generator-ingredients p');
        const instructions = document.querySelector('.generator-instructions p');

        if (generatorTitle) {
            generatorTitle.textContent = meal.strMeal || 'Random Recipe';
        }
        if (generatorImage) {
            generatorImage.src = meal.strMealThumb || 'Not Found';
            generatorImage.alt = meal.strMeal || 'Random Recipe Image';
        }
        if (ingredientsList) {
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredients.push(`${measure} ${ingredient}`);
                } else if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
            ingredientsList.innerHTML = ingredients.join('<br>');
        }
        if (instructions) {
            instructions.textContent = meal.strInstructions || 'Instructions not available.';
        }
    }
});
