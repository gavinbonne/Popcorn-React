import React from 'react';
import './Footer.scss';
import Typography from '@material-ui/core/Typography';

class Footer extends React.Component {
    render() {
        return (
            <div className="app-footer">
                <Typography variant="caption">Copyright © 2017-2019 Popcorn.com, Inc. or its affiliates</Typography>
            </div>
        );
    }
}

export default Footer;