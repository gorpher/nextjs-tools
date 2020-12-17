import React from "react";

interface isState {
    now?: string
    unit?: number //1.毫秒ms  2.秒s
}

export default class Clock extends React.Component<any, isState> {
    private timerID: NodeJS.Timeout;

    constructor(props) {
        super(props);
        this.state = {now: new Date().getTime().toString(), unit: 1};
        this.Start = this.Start.bind(this);
        this.Stop = this.Stop.bind(this);
        this.Refresh = this.Refresh.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
    }

    tick() {
        if (this.state.unit == 2) {
            this.setState({
                now: Math.round(new Date().getTime() / 1000).toString()
            });
            return
        }
        this.setState({
            now: new Date().getTime().toString()
        });
    }


    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    HandleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    Start() {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = setInterval(() => this.tick(), 1000)
        }
    }

    Stop() {
        if (this.timerID) {
            clearInterval(this.timerID);
        }
    }

    Refresh() {
        this.tick()
    }

    render() {
        return (

            <div className="level">
                <div className="level-item has-addons">
                    <a className="button is-static">
                        当前时间
                    </a>
                    <input type="text" className="input " defaultValue={this.state.now}/>
                    <div className="select">
                        <select name="unit" onChange={this.HandleChange}
                                value={this.state.unit}>
                            <option value="1">ms</option>
                            <option value="2">s</option>
                        </select>
                    </div>
                </div>
                <div className="level-item">
                    <button className="button is-success is-light" onClick={this.Start}><i className="fa fa-play"/>开始
                    </button>
                    <button className="button is-warning is-light" onClick={this.Stop}><i className="fa fa-stop"/>停止
                    </button>
                    <button className="button" onClick={this.Refresh}>刷新</button>
                </div>
            </div>
        );
    }
}
