import {createStore} from 'vuex'
import dialogues from "@/store/dialogues";
import header from "@/store/header";
import auth from "@/store/auth";

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
		//sidebar
		showSidebar: false,
		//Load indicator
		showLoader: false,
		clientWidth: 0,
		clientHeight: 0,
	},
    getters: {
		colors: (state) => {
			return state.appColors
		},
		actionMenuOpened: (state) => {
			return state.isActionMenuOpened
		},
		showLoader: (state) => {
			return state.showLoader
		},
		clientWidth: (state) => {
			return state.clientWidth
		},
		clientHeight: (state) => {
			return state.clientHeight
		},
		showSidebar: (state) => {
			return state.showSidebar;
		}
	},
    mutations: {
		actionMenuStatus (state, status) {
			state.isActionMenuOpened = status
		},
		showLoader (state) {
			state.showLoader = true;
		},
		hideLoader (state) {
			state.showLoader = false;
		},
		updateClientData(state, data) {
			state.clientWidth = data.width
			state.clientHeight = data.height
		},
		showSidebar (state) {
			state.showSidebar = true;
		},
		closeSidebar (state) {
			state.showSidebar = false;
		},
	},
    actions: {

		updateColors(context) {//Обновить цвета в css
			let colors = context.getters.colors;
			let keys = Object.keys(colors);
			for (let cssVar of keys) {
				document.documentElement.style.setProperty(cssVar, colors[cssVar]);
			}
		},
		updateDeviceData(context) {
			context.commit("updateClientData", {
				"width" : document.documentElement.clientWidth,
				"height": document.documentElement.clientHeight,
			})
		}

	},
    modules: {
    	dialogues: dialogues,
		header: header,
		auth: auth,
	}
})
