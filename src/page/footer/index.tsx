import React, { Suspense } from 'react'
import styled from 'styled-components'
import Package from '../../../package.json'
//[ package ]
import './index.less'
//[ style ]

import { ReactComponent as FUTI_Icon } from 'assets/svg/futi.svg'
//[ Assets ]

import Ribbon from 'components/Ribbon'
//[ component ]

import { isBaiduSpider } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	//=> 懒加载 Main | '后期装载嵌入式博客可用'
	const likeMeModule = import.meta.glob('../../components/LikeMe/index.tsx')
	const LazyLikeMe = React.lazy(
		likeMeModule['../../components/LikeMe/index.tsx'] as any
	)

	return (
		<Footer className='FOOTER An'>
			<div>
				<a
					className='NAVIGATOR An'
					href='https://www.futiwolf.com'
					data-futi-an='Zoom'
				>
					<FUTI_Icon />
					<div className='thank TIP' data-tooltip='⚡Navigator Kepler'>
						Drawn by NAVILAB
					</div>
				</a>
				<main>
					<div>
						<Ribbon />
						<p className='An'>
							Copyright &copy; 2017 - {new Date().getFullYear()}
							<a
								className='LF TIP'
								href='https://www.lf112.net/'
								data-tooltip='🙃 Independent Websites Developer'
							>
								&nbsp;LF112&nbsp;
							</a>
							All Rights Reserved.
						</p>
						<span className='Nbsp'>/</span>
						<p className='An'>
							<a
								className='TIP'
								href='http://beian.miit.gov.cn'
								rel='noopener noreferrer'
								target='_blank'
								data-tooltip='🔖 ICP'
							>
								琼 ICP 备 2021000434 号 - 2
							</a>
						</p>
						<span className='Nbsp'>/</span>
						<p className='An'>
							<a
								className='TIP'
								href='http://www.beian.gov.cn/portal/registerSystemInfo'
								rel='noopener noreferrer'
								target='_blank'
								data-tooltip='🔒️ Public Security Beian'
							>
								琼公安备 46010702000093 号
							</a>
						</p>
						<span className='Nbsp'>/</span>
						<p className='An'>
							<a
								className='TIP'
								href='https://github.com/LF112/FUTI'
								rel='noopener noreferrer'
								target='_blank'
								data-tooltip='✨ Github Repo'
							>
								V{Package.version}
							</a>
						</p>
					</div>
				</main>
				{!isBaiduSpider ? (
					<Suspense fallback={<></>}>
						<LazyLikeMe />
					</Suspense>
				) : (
					<></>
				)}
			</div>
		</Footer>
	)
}

//=> Style
const Footer = styled.footer`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
`
