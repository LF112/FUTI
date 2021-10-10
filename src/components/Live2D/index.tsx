import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { useUpdateModel3, useModel3 } from 'state/live2d/hooks'
import { Live2DState } from 'state/live2d/slice'
//[ state ]

import { downloadModel } from 'utils/getLive2dModel'
//[ utils ]

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()

	const updateModel3 = useUpdateModel3()
	const model3 = useModel3().model3

	useEffect(() => {
		if (model3.Version == 0) {
			const fetchModelData = async () =>
				updateModel3((await downloadModel()) as Live2DState)

			fetchModelData()
		} else console.log(model3)
	}, [model3])

	return (
		<Main>
			<canvas ref={node as any}></canvas>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	left: -82px;
	top: 68px;
	width: 410px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	canvas {
		transform: scale(0.48);
		pointer-events: none;
		touch-action: none;
		width: 800px;
		height: 700px;
		cursor: inherit;
	}
`
