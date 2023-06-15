import {createStore} from 'vuex'
import dialogues from "@/store/dialogues";
import auth from "@/store/auth";
import websocket from "@/store/websocket";

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

		//image-modal
		showImageModal: false,
		modalImageData: {
    		"src": "http://api.shadownet.loc/storage/files/vou52dL82fltms0rq4O1ns95sxp2FjFCGSxSqBjg.jpg",
			"alt": "Изображение",
		},

		clientWidth: 0,
		clientHeight: 0,
		clientInnerHeight: 0,

		//header
		headerInput: "",

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
		},
		headerInput: (state) => {
			return state.headerInput;
		},
		clientInnerHeight: (state) => {
			return state.clientInnerHeight;
		},
		showImageModal: (state) => {
			return state.showImageModal;
		},
		modalImageData: (state) => {
			return state.modalImageData;
		},
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

		showImageModal (state, image = {"src": "/", "alt": "Изображение"}) {
			state.modalImageData = image;
			state.showImageModal = true;
		},
		hideImageModal (state) {
			state.modalImageData = {"src": "/", "alt": "Изображение"};
			state.showImageModal = false;
		},


		updateClientData(state, data) {
			state.clientWidth = data.width
			state.clientHeight = data.height
			state.clientInnerHeight = data.innerHeight;
		},

		showSidebar (state) {
			state.showSidebar = true;
		},
		closeSidebar (state) {
			state.showSidebar = false;
		},

		headerInput (state, value) {
			state.headerInput = value;
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
		updateDeviceData(context) {
			context.commit("updateClientData", {
				"width" : window.visualViewport.width,
				"height": window.visualViewport.height,
				"innerHeight": window.visualViewport.height,
			})
		}

	},
    modules: {
    	dialogues: dialogues,
		auth: auth,
		ws: websocket,
	}
})
