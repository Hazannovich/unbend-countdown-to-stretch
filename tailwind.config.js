/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#112B3C",
                "secondary": "#F66B0E"
            },
            rotate: {
                '25': '25deg',
                '26': '26deg',
                '27': '27deg',
                '28': '28deg',
                '29': '29deg',
                '30': '30deg',
                '31': '31deg',
                '32': '32deg',
                '33': '33deg',
                '34': '34deg',
                '35': '35deg',
                '36': '36deg',
                '37': '37deg',
                '38': '38deg',
                '39': '39deg',
                '40': '40deg',
                '41': '41deg',
                '42': '42deg',
                '43': '43deg',
                '44': '44deg',
                '45': '45deg',
                '46': '46deg',
                '47': '47deg',
                '48': '48deg',
                '49': '49deg',
                '50': '50deg',
                '51': '51deg',
                '52': '52deg',
                '53': '53deg',
                '54': '54deg',
                '55': '55deg',
                '56': '56deg',
                '57': '57deg',
                '58': '58deg',
                '59': '59deg',
                '60': '60deg'
            },
            screens: {
                '2xl': {'max': '1535px'},

                'xl': {'max': '1279px'},

                'lg': {'max': '1023px'},

                'md': {'max': '767px'},

                'sm': {'max': '639px'},
            }
        }
    },
    plugins: [],
}