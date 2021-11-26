import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
//[ package ]

import { SiRen } from 'utils/useSirenAn'
import { isBaiduSpider } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { t } = useTranslation()
	const node = useRef<HTMLDivElement>()

	useEffect(() => {
		const TEXT = t`Copy and paste constant defaulting.`
		if (!isBaiduSpider) setTimeout(() => SiRen(node.current, TEXT), 250)
		else node.current.innerHTML = TEXT
	}, [t])

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
