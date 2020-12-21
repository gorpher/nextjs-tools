import React from "react";
import format from 'date-fns/format';

// const dateFormat = 'yyyy-MM-dd hh:mm:ss';

const dateFormat = (date: Date) => {
    return format(date, 'yyyy-MM-dd hh:mm:ss')
}

interface isState {
    datetime?: string
    timestamp?: string
    unit?: number //1.毫秒ms  2.秒s

    datetime1?: string
    timestamp1?: string
    unit1?: number //1.毫秒ms  2.秒s
}


export default class DateTranslate extends React.Component<any, isState> {
    constructor(props) {
        super(props);
        let timestamp = new Date().getTime().toString();
        this.state = {
            timestamp: timestamp,
            unit: 1,
            unit1: 1,
            datetime1: dateFormat(new Date(parseInt(timestamp))),
        };
        this.HandleChange = this.HandleChange.bind(this);
        this.Translate = this.Translate.bind(this);
        this.Translate1 = this.Translate1.bind(this);
    }

    componentDidMount() {
        this.Translate()
    }

    HandleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    Translate() {
        if (this.state.unit === 1) {
            this.setState({
                datetime: dateFormat(new Date(parseInt(this.state.timestamp)))
            })
            return
        }
        this.setState({
            datetime: dateFormat(new Date(parseInt(this.state.timestamp) * 1000))
        })
        return;
    }

    Translate1() {
        let input = (this.state.datetime1 + '').replace(/-/g, "/");
        if (this.state.unit1 === 1) {
            this.setState({
                timestamp1: new Date(input).getTime() + ''
            })
            return
        }
        this.setState({
            timestamp1: (new Date(input).getTime() / 1000) + ''
        })
    }

    render() {
        return (<div>
            <div className="group">
                <span className="label">Unix时间戳</span>
                <input type="text" name="timestamp" value={this.state.timestamp} onChange={this.HandleChange}/>
                <select className="select" name="unit" onChange={this.HandleChange}
                        value={this.state.unit}>
                    <option value="1">ms</option>
                    <option value="2">s</option>
                </select>
                <button className="button success" onClick={this.Translate}><i className="fa fa-exchange"/>转换
                </button>
                <input type="text" name="datetime" value={this.state.datetime} onChange={this.HandleChange}/>
            </div>
            <br/>
            <div className="group">
                <span className="label">北京时间</span>
                <input type="text" name="datetime1" value={this.state.datetime1} onChange={this.HandleChange}/>
                <button className="button success" onClick={this.Translate1}><i className="fa fa-exchange"/>转换
                </button>
                <input type="text" name="timestamp1" value={this.state.timestamp1} onChange={this.HandleChange}/>
                <select className="select" name="unit1" onChange={this.HandleChange}
                        value={this.state.unit1}>
                    <option value="1">ms</option>
                    <option value="2">s</option>
                </select>
            </div>
        </div>)
    }
}
