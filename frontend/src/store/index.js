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
		}
	},
    getters: {
		colors: (state) => {
			return state.appColors
		}
	},
    mutations: {},
    actions: {},
    modules: {}
})
