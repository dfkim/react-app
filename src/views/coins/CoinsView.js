import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Button,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RefreshIcon from '@material-ui/icons/Refresh';
import CoinBucket from './CoinBucket';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const HistorysView = () => {
    const classes = useStyles();
    const [coinList, setCoinList] = useState([]);

    useEffect(() => {
        const apiUrl = "https://open.jpbeta.com/stockapi/public_assets";
        fetch(apiUrl, {
            method: 'get',
            headers: {
                'X-API-KEY': '12345678',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            //body: JSON.stringify(postParam)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let symbolData = [];
                let symbol = responseJson.data;
                Object.keys(symbol).forEach(i => {
                 
                    const item = symbol[i];
                    if(item.symbol==="JPY"){
                        return true;
                    }
                    symbolData.push(item);
                })
                setCoinList(symbolData)

            })
            .catch((error) => {
                console.error(error);
                return;
            });
    }, []);
    const handleChangeCoinPrice = (event) => {
        event.preventDefault();
        window.location.reload(false);
    };
    if (coinList.length === 0) {
        return "loading..."
    }

    return (
        <Page
            className={classes.root}
            title="暗号資産"
        >
            <Container maxWidth="lg">


                <Grid container spacing={3}>
                    <Grid item xs={11}>
                        <h2>暗号資産</h2>
                    </Grid>

                    <Grid item xs={1}>
                        <Box textAlign="left">
                            <Button
                                color="primary"
                                endIcon={<RefreshIcon />}
                                size="small"
                                variant="text"
                                onClick={handleChangeCoinPrice}
                            >
                                refresh
                            </Button>
                        </Box>
                    </Grid>
                </Grid>




                <Grid
                    container
                    spacing={3}
                >
                    {Array.from(coinList).map((data, index) => (

                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                            key={index}
                        >
                            <CoinBucket symbolData={data} />
                        </Grid>

                    ))}

                </Grid>
            </Container>
        </Page>
    );
};

export default HistorysView;