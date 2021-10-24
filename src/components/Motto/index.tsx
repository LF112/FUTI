import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { SiRen } from 'utils/useSirenAn'
//[ utils ]

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()

	useEffect(() => {
		setTimeout(
			() => SiRen(node.current, 'Copy and paste constant defaulting.'),
			250
		)
	}, [])

	return (
		<Motto>
			<div>
				<Ttl ref={node as any} />
			</div>
		</Motto>
	)
}

//=> Style
const Motto = styled.div`
	position: relative;
	display: inline-flex;
	height: 100%;
	text-align: center;
	align-items: center;
	> div {
		padding: 0 45px;
		/* border-right: 1px solid rgba(255, 255, 255, 0.2); */
		color: rgba(255, 255, 255, 55%);
		font-weight: bold;
		font-size: 20px;
	}
`

const Ttl = styled.div`
	text-shadow: 0.05em 0.05em 0 rgba(6, 7, 25, 50%);
	font-family: 'RuiZi';
`
