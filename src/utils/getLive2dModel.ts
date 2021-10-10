import axios from 'axios'

import { Live2DState } from 'state/live2d/slice'
//[ state ]

export const downloadModel = () => {
	return new Promise((resolve, reject) => {
		axios
			.all([
				axios.get('./live2d/futi.model3.json'),
				axios.get('./live2d/futi.motion3.json'),
				axios.get('./live2d/futi.moc3'),
				axios.get('./live2d/futi.physics3.json'),
				axios.get('./live2d/futi.2048/texture_00.png')
			])
			.then(
				res => resolve(res[0].data as Live2DState),
				err => reject(err)
			)
	})
}
