/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            inherit: 'inherit',
            current: 'currentColor',
            transparent: 'transparent',
            black: '#171c1f',
            white: '#fff',
            gray: {
                10: '#FAFAFA',
                20: '#F5F2F7',
                30: '#CFCBD2',
                40: '#A59DAA',
                50: '#897F90',
                60: '#4E4752',
                70: '#39343C',
                80: '#272329',
                90: '#171519',
                100: '#080708',
            },
            purple: {
                10: '#F7EBFF',
                20: '#E7C2FF',
                30: '#DBA3FF',
                40: '#C870FF',
                50: '#B642FF',
                60: '#9D00FF',
                70: '#8300D6',
                80: '#6400A3',
                90: '#450070',
                100: '#320052',
            },
            pink: {
                10: '#FEE6F4',
                20: '#FDC4E5',
                30: '#FCB0DC',
                40: '#FB93D0',
                50: '#F962BB',
                60: '#ED098F',
                70: '#C50777',
                80: '#8A0553',
                90: '#63033B',
                100: '#580335',
            },
            red: {
                10: '#FFF1F0',
                20: '#FFE7E5',
                30: '#FFCCD1',
                40: '#FFA8B0',
                50: '#FF666A',
                60: '#FF3338',
                70: '#B81418',
                80: '#75000B',
                90: '#5C0009',
                100: '#410006',
            },
            yellow: {
                10: '#FFF7EB',
                20: '#FFE7C2',
                30: '#FFD799',
                40: '#FFC670',
                50: '#FFB23D',
                60: '#FF9900',
                70: '#CC7A00',
                80: '#704300',
                90: '#573705',
                100: '#3D2500',
            },
            green: {
                10: '#F1FFEB',
                20: '#E5FFD8',
                30: '#CBFFB3',
                40: '#B1FA8F',
                50: '#9EF273',
                60: '#5EEA15',
                70: '#38A300',
                80: '#1F6100',
                90: '#164200',
                100: '#113300',
            },
            blue: {
                10: '#F0F7FF',
                20: '#DBEDFF',
                30: '#CCE6FF',
                40: '#C2E1FF',
                50: '#75BCFF',
                60: '#2997FF',
                70: '#006DD6',
                80: '#00498F',
                90: '#003C75',
                100: '#002F5C',
            },
        },
        lineHeight: {
            none: '1',
            normal: '1.2',
            relaxed: '1.5',
        },
        extend: {
            fontFamily: {
                serif: ['var(--font-neue-haas-grot)'],
                mono: ['var(--font-kode-mono)'],
            },
        },
    },

    plugins: [],
};
