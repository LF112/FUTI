import React from 'react'
import styled from 'styled-components'

import ITEM from './item'

import { useActivePopups } from 'state/popup/hooks'

//=> DOM
export default (props: any) => {
	const activePopups = useActivePopups()

	return (
		<>
			<MAIN>
				{activePopups.map((item: any, index: number) => (
					<ITEM
						key={index}
						iKey={index}
						type={item.type}
						content={item.content}
						timeout={item.timeout}
						//callback={item.callback} | 纯懒狗，晚点再做
					/>
				))}
			</MAIN>
		</>
	)
}

//=> Style
const MAIN = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	z-index: 2000;
`
