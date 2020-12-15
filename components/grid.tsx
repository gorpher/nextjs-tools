import Route from './route'

export default function Grid() {
    const list = Route()
    return (
        <div>
            <div className="Grid">
                {
                    list.flat().map(item => (
                        <div className="Grid_card" key={item.url}   >
                            <div className="clickable" onClick={()=>{window.open(item.url)}}>
                                <h3 className="Grid_card-heading">{item.title}</h3>
                                <p className="Grid_card-body">自动编译并打包。从一开始就为生产环境而优化。</p>
                                <div className="Grid_card-link"><a href={item.url}>{item.title}</a></div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <style jsx >
                {`
            a {
                color: #0074de;
                -webkit-text-decoration: none;
                text-decoration: none;
                -webkit-transition: color 0.2s ease;
                transition: color 0.2s ease;
            }
            .Grid {
                display: grid;
                grid-gap: 24px;
                gap: 24px;
            }

            @media screen and (min-width: 640px) {
                .Grid {
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                }
            }

            .Grid_card {
                border: 1px solid  #eaeaea;
                padding: 24px;
                border-radius: 24px;
                text-align: left;
                flex: 1 1;
                display: flex;
                flex-direction: column;
                transition: box-shadow .2s ease, border .2s ease;
                transition-property: box-shadow, border;
                transition-duration: 0.2s, 0.2s;
                transition-timing-function: ease, ease;
                transition-delay: 0s, 0s;
            }

            .clickable {
                cursor: pointer;
            }

            .Grid_card-heading {
                font-weight: 600;
                font-size: 1.125em;
                line-height: 1.4;
            }

            .Grid_card-body {
                font-size: 14px;
                flex: 1 1;
            }

            .Grid_card-link {
                font-size: 14px;
            }

            .Grid_card-link a {
                text-decoration: none;
                color: rgb(6, 125, 247);
                font-size: inherit;
            }

            @media (hover: hover) {
                .Grid_card:hover {
                    transition: box-shadow .2s ease;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                    border: 1px solid transparent;
                }
            }
            `}
            </style>
        </div>
    )
}