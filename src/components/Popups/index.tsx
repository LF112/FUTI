import React from 'react'
import styled from 'styled-components'

import ITEM from './item'
import UnstableSoftware from 'components/Detroit/unstableSoftware'

import { useActivePopups, useActiveRA9 } from 'state/popup/hooks'

//=> DOM
export default (props: any) => {
	const activePopups = useActivePopups()
	const activeRA9 = useActiveRA9()

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
				<RA9>
					{activeRA9.map((item: any) => {
						if (Object.keys(item).length > 0)
							return (
								<UnstableSoftware
									key={item.id}
									iKey={item.id}
									text={item.content}
									down={item.type}
								/>
							)
					})}
				</RA9>
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

const RA9 = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	margin-top: 65px;
	margin-right: 15px;
`
