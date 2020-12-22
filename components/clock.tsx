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
            <div className="mt2 fullwidth flex">
                <div className="group" style={{marginRight: '1em', flexShrink: 2}}>
                    <span className="static" style={{width: 120}}>当前时间</span>
                    <input className="input text-info" type="text" defaultValue={this.state.now}/>
                    <select className="select" name="unit" onChange={this.HandleChange}
                            value={this.state.unit}>
                        <option value="1">ms</option>
                        <option value="2">s</option>
                    </select>
                </div>
                <div className="group">
                    <button className="button success" onClick={this.Start}><i className="fa fa-play"/>开始
                    </button>
                    <button className="button info" onClick={this.Stop}><i className="fa fa-stop"/>停止
                    </button>
                    <button className="button" onClick={this.Refresh}>刷新</button>
                </div>
            </div>

        );
    }
}
