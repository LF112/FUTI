import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { l2dInitStatus, l2dUnfold } = props

	return (
		<Main>
			<i
				className='el-icon-thumb'
				style={{ opacity: l2dInitStatus ? (l2dUnfold ? 0 : 1) : 0 }}>
				<span>TOUCH</span>
			</i>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 8px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	> i {
		color: #fff;
		font-size: 20px;
		font-weight: lighter;
		padding: 4px 6px;
		border-radius: 4px;
		user-select: none;
		text-align: center;
		display: inline-grid !important;
		> span {
			color: #fff;
			font-family: 'Russo One';
			margin-top: 2px;
		}
	}
	animation: 1s linear infinite;
	animation-name: breathe;
	animation-timing-function: ease-in-out;
	animation-direction: alternate;
	@keyframes breathe {
		0% {
			opacity: 0.4;
			color: hsla(0, 0%, 100%, 0);
		}
		100% {
			opacity: 0.9;
			color: #fff;
		}
	}
`
