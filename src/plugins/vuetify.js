// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Vuetify
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
    dark: true,
    colors: {
        background: '#212121',
        'nav-background': '#212121',
        'background-lighten-1': '#2a2a2a',
        'background-lighten-2': '#3f3f3f',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
    }
}

export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        }
    }
})
