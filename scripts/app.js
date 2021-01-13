//  ------------abrir ocpiones THEME---------
const BUTTON_THEME = document.getElementById('buttonTema');
const CONTAINER_THEMES = document.getElementsByClassName('container-elegirTema')[0];

//muestro opciones de theme
BUTTON_THEME.addEventListener("click", ev => {
    CONTAINER_THEMES.classList.toggle('showOptionsTheme')
})


//  ------------cambiar THEME---------
const CONTAINER_THEME_DAY = document.getElementsByClassName("tema")[0];
const CONTAINER_THEME_NIGHT = document.getElementsByClassName("tema")[1];

CONTAINER_THEME_DAY.addEventListener("click", themeLight)
CONTAINER_THEME_NIGHT.addEventListener("click", themeDark)

//al clickear en Saylor Day cambio a theme light lo guardo en local storage
function themeLight(){
    // document.documentElement.setAttribute("theme", "light");
    const htmlElement = document.documentElement;
    htmlElement.dataset.theme = 'light';
    storageThemeValue = "light"
    localStorage.setItem("storageTheme", storageThemeValue)
}


//al clickear en Saylor Night cambio a theme dark lo guardo en local storage
function themeDark(){
    // document.documentElement.setAttribute("theme", "dark");
    const htmlElement = document.documentElement;
    htmlElement.dataset.theme = 'dark';
    storageThemeValue = "dark"
    localStorage.setItem("storageTheme", storageThemeValue)
}



//reviso que tema quedo guardado para cargar la pagina con el ultimo tema usado
document.addEventListener("DOMContentLoaded", storageTheme(event));

function storageTheme() {
    let storageThemeValue = localStorage.getItem("storageTheme")
    if (storageThemeValue == null) {
        //tema claro por defecto
        themeLight()
    }
    else{
        document.documentElement.setAttribute("data-theme", storageThemeValue);
    }

    
}


