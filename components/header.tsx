import styles from './header.module.css'
import Route from './route'

export default function Header() {
    const menus = Route()
    return (
        <header className='sticky'>
            <div>
                <a href="#reach-skip-nav" data-reach-skip-link="true">Skip to content</a>
                <nav className="f-reset">
                    <div className={styles.links}>
                        <a title="Go to the homepage" href="/">
                            <img src="/images/favicon.svg"/>
                        </a>
                        {
                            menus.flat().map((menu) =>
                                <a key={menu.url} title={menu.title} className={styles.mute}>
                                    {menu.title}
                                </a>
                            )
                        }
                    </div>
                </nav>
            </div>
            <style jsx>{
                `
                svg {
                    width: 22px;
                    height: 22px;
                }

                nav {
                    position: relative;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    height: 80px;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-align-items: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                }
                                
                header {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    -webkit-box-align: center;
                    align-items: center;
                    width: 100%;
                    background: rgb(255, 255, 255);
                    z-index: 1000;
                    border-bottom: 1px solid rgb(234, 234, 234);
                }

                [data-reach-skip-link] {
                    border: 0;
                    -webkit-clip: rect(0 0 0 0);
                    clip: rect(0 0 0 0);
                    height: 1px;
                    width: 1px;
                    margin: -1px;
                    padding: 0;
                    overflow: hidden;
                    position: absolute;
                }
              `
            }</style>
        </header>

    )

}
