import {createStore} from 'vuex'

export default createStore({
    state: {
    	//все цвета в приложении
    	appColors: {
    		"--bg": "#1A1126",
			"--bg2": "#332B3E",
			"--bg3": "#4C405B",
			"--bg4": "#857E90",
			"--bg5": "#fff",

			"--text": "#FFFFFF",

			"--gray1": "#F0F0F0",
			"--gray2": "#F3F3F3",
			"--gray3": "#F5F5F5",
			"--gray4": "#D9D9D9",
			"--gray5": "#5E5369",

			"--main": "#5C04BB",
			"--main2": "#C6009A",
		},
		//Action menu
		isActionMenuOpened: false,
	},
    getters: {
		colors: (state) => {
			return state.appColors
		},
		actionMenuOpened: (state) => {
			return state.isActionMenuOpened
		}
	},
    mutations: {
		actionMenuStatus (state, status) {
			state.isActionMenuOpened = status
		}
	},
    actions: {

		updateColors(context) {//Обновить цвета в css
			let colors = context.getters.colors;
			let keys = Object.keys(colors);
			for (let cssVar of keys) {
				document.documentElement.style.setProperty(cssVar, colors[cssVar]);
			}
		},

	},
    modules: {}
})
