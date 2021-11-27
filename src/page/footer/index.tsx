import React, { Suspense } from 'react'
import styled from 'styled-components'
import Package from '../../../package.json'
import { useTranslation } from 'react-i18next'
//[ package ]
import './index.less'
//[ style ]

import { ReactComponent as FUTI_Icon } from 'assets/svg/futi.svg'
//[ Assets ]

import Ribbon from 'components/Ribbon'
//[ component ]

import { isBaiduSpider, isFutiSite } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { t } = useTranslation()

	//=> 懒加载 LikeMe
	const likeMeModule = import.meta.glob('../../components/LikeMe/index.tsx')
	const LazyLikeMe = React.lazy(
		likeMeModule['../../components/LikeMe/index.tsx'] as any
	)

	return (
		<Footer className='FOOTER An'>
			<div>
				<a
					className='NAVIGATOR An'
					href={
						isFutiSite ? 'https://www.lf112.net' : 'https://www.futiwolf.com'
					}
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
								data-tooltip={t`🙃 Independent Websites Developer`}
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
								data-tooltip={t`🔖 ICP`}
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
								data-tooltip={t`🔒️ Public Security Beian`}
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
								data-tooltip={t`✨ Github Repo`}
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
	@media screen and (max-width: 780px) {
		> div {
			display: inline-grid;
			> main {
				padding: 0 10%;
				border-left: unset;
				> div {
					display: inline-grid;
					width: 100%;
					text-align: center;
					.Nbsp {
						display: none;
					}
				}
			}
		}
	}
`
