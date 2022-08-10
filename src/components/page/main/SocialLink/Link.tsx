import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { icon, name, url, style } = props

	return (
		<Link
			className='An'
			href={url}
			target='_blank'
			rel='external noopener nofollow'
			style={style}>
			<div>
				{icon}
				<p>{name}</p>
			</div>
		</Link>
	)
}

//=> Style
const Link = styled.a`
	user-select: none;
	opacity: 0;
	animation: FadeIn_Top 250ms forwards;
	> div {
		padding: 2px 8px 2px 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		> svg {
			width: 28px;
			height: 28px;
			path {
				fill: rgba(236, 246, 255, 85%) !important;
			}
		}
		> p {
			color: rgba(236, 246, 255, 85%);
			line-height: 28px;
			padding-left: 2px;
			font-size: 16px;
			font-weight: 600;
			letter-spacing: 0.8px;
			font-family: 'Saira';
		}
	}
	:hover {
		> div {
			border-radius: 4px;
			background: rgba(88, 88, 88, 0.5);
			box-shadow: 0 1px 2px rgba(33, 35, 36, 45%);
			> div {
				transform: scale(0.95);
			}
		}
	}
`
