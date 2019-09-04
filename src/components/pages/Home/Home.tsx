import React from 'react'
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { Table, TableHead, TableRow, TableCell, TableBody, Theme, Container, Paper, Toolbar } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
    table: {
        minWidth: 650,
        color: "inherit"
    }
});

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            movieList: []
        };
    }

    getData = () => {
        return ajax.getJSON(`https://api.themoviedb.org/3/movie/top_rated?api_key=bc534dbe5889de4128596676faa76a20&language=en-US&page=1&region=US`).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return err;
            })
        )
    };

    render() {
        const { classes } = this.props;
        
        return (
            <Container fixed>
                <Paper>
                    <Toolbar>Top Rated Movies</Toolbar>
                    <Table
                        className={classes.table}
                        size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.movieList.map((row: any) => (
                                <TableRow key={row.title}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell>{row.overview}</TableCell>
                                    <TableCell align="right">{row.vote_average}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        );
    }

    componentDidMount() {
        this.getData().subscribe((res: any) => {
            this.setState({
                movieList: res.results
            });
        }, error => {
            this.setState({
                movieList: error
            });
        });
    }
}

export default withStyles(styles)(Home);
