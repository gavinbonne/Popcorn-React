import React, { Fragment } from 'react'
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {output: "12345"};
    }

    getData = () => {
        return ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/1`).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return err;
            })
        )
    };

    render() {
        const numbers = [1, 2, 3];
        const listItems = numbers.map((number) => 
            <li key={number.toString()}>{number}</li>
        );
        
        return (
            <Fragment>
                <div>{this.state.output}</div>
                <ul>{listItems}</ul>
            </Fragment>
        );
    }

    componentDidMount() {
        this.getData().subscribe(res => {
            this.setState({
                output: JSON.stringify(res)
            });
        }, error => {
            this.setState({
                output: error
            });
        });
    }
}

export default Home;
