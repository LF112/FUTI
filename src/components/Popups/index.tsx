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
				{activePopups.map((item: any) => {
					if (Object.keys(item).length > 0)
						return (
							<ITEM
								key={item.id}
								iKey={item.id}
								type={item.type}
								content={item.content}
								timeout={item.timeout}
								close={item.close}
								//callback={item.callback} | 纯懒狗，晚点再做
							/>
						)
				})}
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
