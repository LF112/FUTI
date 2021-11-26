import i18n from 'i18next'

import enUsTrans from './en.json'
import zhCnTrans from './cn.json'

import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	react: {
		transSupportBasicHtmlNodes: true, // 允许 i18n 使用的简单HTML元素
		transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span']
	},
	resources: {
		en: {
			translation: enUsTrans
		},
		cn: {
			translation: zhCnTrans
		}
	},
	fallbackLng: 'en',

	debug: false,
	interpolation: {
		escapeValue: false
	}
})
export default i18n
